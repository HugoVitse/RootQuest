# base de données mysql

#server
resource "azurerm_mysql_flexible_server" "main" {
  name                = "${var.project_name}-${var.environment}-mysql"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  zone                = "1"

  delegated_subnet_id = azurerm_subnet.db.id              #db dans son propre subnet
  private_dns_zone_id = azurerm_private_dns_zone.mysql.id #dns privé


  depends_on = [azurerm_private_dns_zone_virtual_network_link.main]

  administrator_login    = var.mysql_admin_username
  administrator_password = var.mysql_admin_password

  sku_name = "B_Standard_B1ms"
  storage {
    auto_grow_enabled = true
    size_gb           = var.mysql_storage_gb
  }
  version = var.mysql_version

  # Backup
  backup_retention_days        = 7
  geo_redundant_backup_enabled = false

  tags = var.tags
}

# Bdd
resource "azurerm_mysql_flexible_database" "main" {
  name                = var.project_name
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"
}
