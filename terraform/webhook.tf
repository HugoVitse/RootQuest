# webhook pour que la webapp pull l'image dès qu'un nouveau build arrive sur l'acr

resource "azurerm_container_registry_webhook" "main" {
  name                = "${var.project_name}${var.environment}hook"
  resource_group_name = azurerm_resource_group.main.name
  registry_name       = azurerm_container_registry.main.name
  location            = azurerm_resource_group.main.location

  service_uri = "https://${azurerm_linux_web_app.main.site_credential[0].name}:${azurerm_linux_web_app.main.site_credential[0].password}@${azurerm_linux_web_app.main.name}.scm.azurewebsites.net/docker/hook"
  
  status = "enabled"
  
  #le webhook est destiné que a la webapp!!!!!
  scope  = "rootquest:${var.image_tag}" 
  actions = ["push"]

  custom_headers = {
    "Content-Type" = "application/json"
  }
}