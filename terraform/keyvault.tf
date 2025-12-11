# keyvault.tf

data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "main" {
  name                        = "${var.project_name}-${var.environment}-kv"
  location                    = azurerm_resource_group.main.location
  resource_group_name         = azurerm_resource_group.main.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = "standard"

  

  # Politique d'accès pour TOI (celui qui lance Terraform) afin de pouvoir écrire les secrets
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge", "Recover"
    ]
  }
}

resource "azurerm_key_vault_access_policy" "webapp" {
  depends_on = [
    azurerm_linux_web_app.main
  ]
  key_vault_id = azurerm_key_vault.main.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = azurerm_linux_web_app.main.identity[0].principal_id

  secret_permissions = [
    "Get", "List"
  ]
}

# --- DÉFINITION DES SECRETS ---

# 1. Secret de l'API VPN (Généré par Terraform via random_password)
resource "azurerm_key_vault_secret" "vpn_api_key" {
  name         = "VpnApiKey"
  value        = random_password.vpn_api_secret.result
  key_vault_id = azurerm_key_vault.main.id
}

# 2. Clé du Storage Account (Récupérée dynamiquement)
resource "azurerm_key_vault_secret" "storage_key" {
  name         = "StorageAccountKey"
  value        = azurerm_storage_account.main.primary_access_key
  key_vault_id = azurerm_key_vault.main.id
}

# 3. Mot de passe BDD (Venant de tes variables)
resource "azurerm_key_vault_secret" "db_password" {
  name         = "DbPassword"
  value        = var.mysql_admin_password
  key_vault_id = azurerm_key_vault.main.id
}

# 4. Secret de Session (Généré aléatoirement pour la prod)
resource "random_password" "session_secret" {
  length  = 64
  special = true
}

resource "azurerm_key_vault_secret" "session_secret" {
  name         = "SessionSecret"
  value        = random_password.session_secret.result
  key_vault_id = azurerm_key_vault.main.id
}