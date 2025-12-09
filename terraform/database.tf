# Configuration de la base de données MySQL Azure (version simple)

resource "azurerm_mysql_flexible_server" "main" {
  name                = "${var.project_name}-${var.environment}-mysql"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  zone                = "1"

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

# Base de données principale
resource "azurerm_mysql_flexible_database" "main" {
  name                = var.project_name
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  charset             = "utf8mb4"
  collation           = "utf8mb4_unicode_ci"
}

# Règle de pare-feu pour autoriser les services Azure
resource "azurerm_mysql_flexible_server_firewall_rule" "allow_azure_services" {
  name                = "AllowAzureServices"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}
