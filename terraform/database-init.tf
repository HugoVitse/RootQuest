# database-init.tf

# 1. On récupère ton IP publique actuelle
data "http" "myip" {
  url = "https://api.ipify.org"
}

# 2. On autorise ton PC à parler au serveur MySQL Azure
resource "azurerm_mysql_flexible_server_firewall_rule" "dev_access" {
  name                = "AllowDevMachine"
  resource_group_name = azurerm_resource_group.main.name
  server_name         = azurerm_mysql_flexible_server.main.name
  start_ip_address    = chomp(data.http.myip.response_body)
  end_ip_address      = chomp(data.http.myip.response_body)
}

# 3. On exécute le script init-db.sql
resource "null_resource" "db_init" {
  depends_on = [
    azurerm_mysql_flexible_database.main,
    azurerm_mysql_flexible_server_firewall_rule.dev_access
  ]

  # Ce bloc s'exécute si le fichier SQL change ou si le serveur change
  triggers = {
    sql_hash = filesha256("${path.module}/init-db.sql") # Assure-toi que le fichier est au même niveau
    db_id    = azurerm_mysql_flexible_database.main.id
  }

  provisioner "local-exec" {
    # On utilise 'mariadb' et le flag '--ssl' qui est compatible
    command = <<EOT
      mariadb -h ${azurerm_mysql_flexible_server.main.fqdn} \
            -u ${var.mysql_admin_username} \
            -p'${var.mysql_admin_password}' \
            --ssl \
            ${azurerm_mysql_flexible_database.main.name} < init-db.sql
    EOT
  }
}