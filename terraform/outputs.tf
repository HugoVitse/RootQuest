# outputs  clean

output "resource_group_name" {
  description = "Nom du Resource Group"
  value       = azurerm_resource_group.main.name
}

output "app_service_url" {
  description = "URL de l'application"
  value       = "https://${azurerm_linux_web_app.main.default_hostname}"
}

output "mysql_server_name" {
  description = "Nom du serveur MySQL"
  value       = azurerm_mysql_flexible_server.main.name
}

output "mysql_fqdn" {
  description = "FQDN du serveur MySQL"
  value       = azurerm_mysql_flexible_server.main.fqdn
}

output "acr_login_server" {
  description = "URL du Container Registry"
  value       = azurerm_container_registry.main.login_server
}

output "acr_username" {
  description = "Username du Container Registry"
  value       = azurerm_container_registry.main.admin_username
  sensitive   = true
}

output "acr_password" {
  description = "Password du Container Registry"
  value       = azurerm_container_registry.main.admin_password
  sensitive   = true
}

output "acr_name" {
  description = "Nom du Container Registry"
  value       = azurerm_container_registry.main.name
}
