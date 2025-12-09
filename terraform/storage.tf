# Configuration Storage Account pour les volumes persistants

resource "azurerm_storage_account" "main" {
  name                     = "${var.project_name}${var.environment}st"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = var.storage_account_tier
  account_replication_type = var.storage_account_replication_type

  tags = var.tags
}

# File Share pour les données OpenVPN
resource "azurerm_storage_share" "openvpn_data" {
  name                 = "openvpn-data"
  storage_account_name = azurerm_storage_account.main.name
  quota                = 5 # 5 GB
}
