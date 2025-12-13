# keyvault

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main" {
  name                        = "${var.project_name}-${var.environment}-kvault"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"



  # access policy pour developpeur
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }
}




# --- secrets ---

#secret api du vpn
resource "azurerm_key_vault_secret" "vpn_api_key" {
  name         = "VpnApiKey-vault"
  value        = random_password.vpn_api_secret.result
  key_vault_id = azurerm_key_vault.main.id
}

# key du stockage account
resource "azurerm_key_vault_secret" "storage_key" {
  name         = "StorageAccountKey-vault"
  value        = azurerm_storage_account.main.primary_access_key
  key_vault_id = azurerm_key_vault.main.id
}

# bdd password (il vient de terraform.tfvars (penser a bien l'inclure))
resource "azurerm_key_vault_secret" "db_password" {
  name         = "DbPassword-vault"
  value        = var.mysql_admin_password
  key_vault_id = azurerm_key_vault.main.id
}

# secret qui encode les cookies de session web
resource "random_password" "session_secret" {
  length  = 64
  special = true
}

resource "azurerm_key_vault_secret" "session_secret" {
  name         = "SessionSecret-vault"
  value        = random_password.session_secret.result
  key_vault_id = azurerm_key_vault.main.id
}