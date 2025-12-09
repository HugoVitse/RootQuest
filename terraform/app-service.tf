# Configuration App Service pour l'application Next.js

# App Service Plan
resource "azurerm_service_plan" "main" {
  name                = "${var.project_name}-${var.environment}-asp"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku

  tags = var.tags
}

resource "azurerm_linux_web_app" "main" {
  name                = "${var.project_name}-${var.environment}-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  identity {
    type = "SystemAssigned"
  }

  depends_on = [azurerm_container_registry.main]

  site_config {
    websockets_enabled  = true
    minimum_tls_version = "1.2"
    ftps_state          = "Disabled"

    # --- AJOUT CRUCIAL ICI ---
    # Cela dit à l'App Service : "Utilise ton identité système pour te loguer à l'ACR"
    container_registry_use_managed_identity = true

    application_stack {
      # ✅ ON ENLÈVE LE SERVEUR ICI
      # On garde juste "nom_image:tag"
      docker_image_name = "rootquest:${var.image_tag}"

      # On laisse l'URL ici, Azure s'en servira pour trouver le chemin
      docker_registry_url = "https://${azurerm_container_registry.main.login_server}"
    }
  }

  app_settings = {
    "NODE_ENV"                   = var.environment
    "DB_HOST"                    = azurerm_mysql_flexible_server.main.fqdn
    "DB_USER"                    = var.mysql_admin_username
    "DB_PASSWORD"                = var.mysql_admin_password
    "DB_NAME"                    = azurerm_mysql_flexible_database.main.name
    "AZURE_SUBSCRIPTION_ID"      = data.azurerm_client_config.current.subscription_id
    "AZURE_RESOURCE_GROUP"       = azurerm_resource_group.main.name
    "AZURE_LOCATION"             = azurerm_resource_group.main.location
    "DOCKER_ENABLE_CI"           = "true"
    "AZURE_SUBNET_ID"            = azurerm_subnet.challenges.id
    "acrUseManagedIdentityCreds" = "true"

    # Utile pour ne pas masquer les logs Docker
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    # --- NOTE IMPORTANTE ---
    # On garde DOCKER_REGISTRY_SERVER_URL pour la Managed Identity parfois,
    # MAIS on supprime DOCKER_CUSTOM_IMAGE_NAME d'ici car c'est géré par application_stack plus haut.
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.main.login_server}"

    # Pour forcer le pull de l'image si jamais ça bloque encore (optionnel)
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
  }

  tags = var.tags
}
# Data source pour obtenir l'ID de subscription
data "azurerm_client_config" "current" {}

# Assign AcrPull role to the Web App's managed identity so it can pull images from ACR
resource "azurerm_role_assignment" "webapp_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  # identity is exported as a list object; access the first element's principal_id
  principal_id = azurerm_linux_web_app.main.identity[0].principal_id

  # ensure identity exists before creating the role assignment
  depends_on = [azurerm_linux_web_app.main]
}
