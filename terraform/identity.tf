# identity pour autoriser les challenges a pull depuis l'acr
resource "azurerm_user_assigned_identity" "challenges" {
  location            = azurerm_resource_group.main.location
  name                = "${var.project_name}-challenges-identity"
  resource_group_name = azurerm_resource_group.main.name
}

# on donne à cette identité le droit de tirer des images de l'ACR
resource "azurerm_role_assignment" "challenges_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.challenges.principal_id
}


#pareil pour l'aci
resource "azurerm_user_assigned_identity" "aci_db_init_identity" {
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  name                = "aci-db-init-identity" # Nom unique pour l'ACI Job
}

resource "azurerm_role_assignment" "aci_acr_pull" {
  scope                = azurerm_container_registry.main.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_user_assigned_identity.aci_db_init_identity.principal_id
  
  # dependances sans quoi ca plante 
  depends_on = [
    azurerm_container_registry.main,
    azurerm_user_assigned_identity.aci_db_init_identity
  ]
}