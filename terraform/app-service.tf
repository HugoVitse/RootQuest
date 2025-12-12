# app service qui contietn notre appli web

# app service plan dans lequel est contenu la webapp
resource "azurerm_service_plan" "main" {
  name                = "${var.project_name}-${var.environment}-asp"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = var.app_service_sku

  tags = var.tags
}

#role contributor sur le rg car on a besoin de lancer des container depuis la webapp
resource "azurerm_role_assignment" "webapp_contributor" {
  scope                = azurerm_resource_group.main.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_linux_web_app.main.identity[0].principal_id
}

#autorise la webapp a pull des images depuis l'acr (permet a la service app de pull l'image de la webapp)
resource "azurerm_role_assignment" "webapp_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_linux_web_app.main.identity[0].principal_id
  depends_on = [azurerm_linux_web_app.main]
}


#webapp
resource "azurerm_linux_web_app" "main" {
  name                = "${var.project_name}-${var.environment}-app"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_service_plan.main.location
  service_plan_id     = azurerm_service_plan.main.id

  #identité managé pour accès aux ressources
  identity {
    type = "SystemAssigned"
  }


  #webapp dans son propre subnet
  virtual_network_subnet_id = azurerm_subnet.web.id

  #necessaire pour que la webapp puisse pull son image
  depends_on = [azurerm_container_registry.main]

  site_config {
    websockets_enabled  = true #multijoueur
    minimum_tls_version = "1.2"
    ftps_state          = "Disabled"
    
    container_registry_use_managed_identity = true

    application_stack {

        docker_image_name   = "rootquest:${var.image_tag}"                                #image docker de la webapp
        docker_registry_url = "https://${azurerm_container_registry.main.login_server}"   # acr
    }
  }

  app_settings = {
    #variable d'environnements
    "NODE_ENV"             = var.environment

    "DB_HOST"              = azurerm_mysql_flexible_server.main.fqdn
    "DB_USER"              = var.mysql_admin_username
    "DB_NAME"              = azurerm_mysql_flexible_database.main.name

    "AZURE_SUBSCRIPTION_ID" = data.azurerm_client_config.current.subscription_id
    "AZURE_RESOURCE_GROUP"  = azurerm_resource_group.main.name
    "AZURE_LOCATION"        = azurerm_resource_group.main.location
    "AZURE_SUBNET_ID" = azurerm_subnet.challenges.id

    "CHALLENGE_IDENTITY_ID" = azurerm_user_assigned_identity.challenges.id
    "ACR_LOGIN_SERVER"      = azurerm_container_registry.main.login_server
    "acrUseManagedIdentityCreds" = "true"
    "VPN_PUBLIC_IP"        = azurerm_public_ip.vpn.ip_address # Ajouté dans vpn.tf
    "SCRIPT_PATH"          = "/home/vpnadmin/vm_renew_certificate.sh"
    "VPN_ADMIN_USER"       = "vpnadmin"


    #celles du keyvault
    "VPN_API_KEY" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.vpn_api_key.id})"
    "AZURE_STORAGE_KEY_SECRET" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.storage_key.id})"
    "DB_PASSWORD" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.db_password.id})"
    "SESSION_SECRET" = "@Microsoft.KeyVault(SecretUri=${azurerm_key_vault_secret.session_secret.id})"

    "STORAGE_ACCOUNT_NAME"     = azurerm_storage_account.main.name
    "STORAGE_SHARE_NAME"       = azurerm_storage_share.openvpn_data.name # openvpn-data
    
    # logs Docker
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"

    "DOCKER_ENABLE_CI"     = "true"
    "DOCKER_REGISTRY_SERVER_URL" = "https://${azurerm_container_registry.main.login_server}"
  }

  tags = var.tags
}
