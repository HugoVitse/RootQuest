# ACR contenant les images des challenges, celle de la webpp, et de l'ACI qui initie la db.

resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}${var.environment}acr" # ACR names must be lowercase and alphanumeric
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku

  trust_policy {
    enabled = false
  }

  tags = var.tags
}


