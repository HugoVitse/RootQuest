# webhook.tf

resource "azurerm_container_registry_webhook" "main" {
  name                = "${var.project_name}${var.environment}hook"
  resource_group_name = azurerm_resource_group.main.name
  registry_name       = azurerm_container_registry.main.name
  location            = azurerm_resource_group.main.location

  # C'est ici que la magie opère : on récupère les identifiants de déploiement de l'App Service
  service_uri = "https://${azurerm_linux_web_app.main.site_credential[0].name}:${azurerm_linux_web_app.main.site_credential[0].password}@${azurerm_linux_web_app.main.name}.scm.azurewebsites.net/docker/hook"
  
  status = "enabled"
  
  # IMPORTANT : On restreint le scope à l'image et au tag que tu utilises
  scope  = "rootquest:${var.image_tag}" 
  actions = ["push"]

  custom_headers = {
    "Content-Type" = "application/json"
  }
}