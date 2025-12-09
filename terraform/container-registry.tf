# Configuration Azure Container Registry (ACR)

resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}${var.environment}acr" # ACR names must be lowercase and alphanumeric
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = var.acr_sku
  admin_enabled       = true # Pour simplifier, activé. En production, utiliser des identités managées

  # Configuration de la rétention des builds
  trust_policy {
    enabled = false
  }

  tags = var.tags
}

# Output pour faciliter l'utilisation
# Les images Docker des défis de pentest devront être buildées et pushées dans ce registry
# Exemple de commande :
# az acr build --registry ${azurerm_container_registry.main.name} --image cyberspace1:latest ./images/cyberspace1

