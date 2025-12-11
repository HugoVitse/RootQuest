# vpn.tf

resource "random_password" "vpn_api_secret" {
  length  = 32
  special = false
}

# 1. IP Publique pour que les joueurs puissent se connecter
resource "azurerm_public_ip" "vpn" {
  name                = "${var.project_name}-vpn-ip"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = var.tags
}

# 2. Interface Réseau
resource "azurerm_network_interface" "vpn" {
  name                = "${var.project_name}-vpn-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.vpn.id # Le subnet isolé pour le VPN
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.vpn.id
  }
}

# 3. Security Group (Pare-feu) : Ouverture des ports VPN (1194 UDP) et SSH (22 TCP)


resource "azurerm_network_interface_security_group_association" "vpn" {
  network_interface_id      = azurerm_network_interface.vpn.id
  network_security_group_id = azurerm_network_security_group.vpn.id
}

# 4. La VM OpenVPN (Petite, suffisante pour ce rôle)
resource "azurerm_linux_virtual_machine" "vpn" {
  name                = "${var.project_name}-vpn-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_B1s" # Très économique
  admin_username      = "vpnadmin"
  network_interface_ids = [
    azurerm_network_interface.vpn.id,
  ]

  admin_ssh_key {
    username   = "vpnadmin"
    public_key = file("~/.ssh/id_rsa.pub") # Assure-toi que cette clé existe localement!
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  # 5. Script de démarrage (Cloud-init) pour installer Docker et lancer OpenVPN
  custom_data = base64encode(
    templatefile("${path.module}/../scripts/install-vpn.sh", {
      vpn_ip = azurerm_public_ip.vpn.ip_address
      vpn_api_secret  = random_password.vpn_api_secret.result
      vpn_private_ip  = azurerm_network_interface.vpn.private_ip_address # IP privée de la VM
      storage_account_name = azurerm_storage_account.main.name
      storage_account_key  = azurerm_storage_account.main.primary_access_key
      MOUNT_POINT = "/mnt/openvpn-share"
    })
  )
  
  tags = var.tags
}