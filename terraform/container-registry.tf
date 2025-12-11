# Configuration Azure Container Registry (ACR)

resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}${var.environment}acr" # ACR names must be lowercase and alphanumeric
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku

  # Configuration de la rétention des builds
  trust_policy {
    enabled = false
  }

  tags = var.tags
}


