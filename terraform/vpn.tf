# vconfig du vpn
# le serveur openvpn est hebergé sur une vm.
# les renovuellement de fichier client s'effectuetn via un appel api sur la vm (depuis la webapp node)

#secret api pour communication avec webapp
resource "random_password" "vpn_api_secret" {
  length  = 32
  special = false
}

#ip publique pour le vpn (vpn et webapp pas sur le meme vnet)
resource "azurerm_public_ip" "vpn" {
  name                = "${var.project_name}-vpn-ip"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  allocation_method   = "Static"
  sku                 = "Standard"
  tags                = var.tags
}

# interface réseau
resource "azurerm_network_interface" "vpn" {
  name                = "${var.project_name}-vpn-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.vpn.id #  subnet vpn
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.vpn.id
  }
}




# la VM OpenVPN 
resource "azurerm_linux_virtual_machine" "vpn" {
  name                = "${var.project_name}-vpn-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_B1s" 
  admin_username      = "vpnadmin"
  network_interface_ids = [
    azurerm_network_interface.vpn.id,
  ]

  admin_ssh_key {
    username   = "vpnadmin"
    public_key = file("~/.ssh/id_rsa.pub") # pour se connecter a la vm en ssh (s'assurer d'avoir ce fichier sur son pc)
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy" #image legere mais complete pour openvpn
    sku       = "22_04-lts"
    version   = "latest"
  }

  # script de démarrage  pour installer docker et les dependances necessaire et lancer le container openvpn
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