# storage account

resource "azurerm_storage_account" "main" {
  name                     = "${var.project_name}${var.environment}st"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = var.storage_account_tier
  account_replication_type = var.storage_account_replication_type

  # on restreint 
  network_rules {
    default_action = "Deny"
    bypass         = ["AzureServices"]
    virtual_network_subnet_ids = [
      azurerm_subnet.vpn.id,
      azurerm_subnet.web.id,
      azurerm_subnet.aci.id,
    ]
  }

  tags = var.tags
}

# File Share pour les fichiers clients openvpn!!!
resource "azurerm_storage_share" "openvpn_data" {
  name                 = "openvpn-data"
  storage_account_name = azurerm_storage_account.main.name
  quota                = 5 # peut être trop a voir
}
