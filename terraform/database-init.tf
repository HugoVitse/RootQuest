# database-init.tf

# 1. On récupère ton IP publique actuelle
data "http" "myip" {
  url = "https://api.ipify.org"
}

# database-init.tf (Remplacement du null_resource)

# 🛑 1. Le Build et Push de l'image (si vous n'avez pas déjà un bloc pour ça)
# Vous devrez utiliser un provisioner local-exec pour faire le docker build/push
resource "null_resource" "build_and_push_db_init" {
  triggers = {
    # Déclencher le build uniquement si le fichier change
    file_hash = filemd5("db-init/Dockerfile")
    sql_hash  = filemd5("db-init/init-db.sql")
  }
  
  # Assurez-vous d'avoir Docker/az cli configuré pour le build/push
  provisioner "local-exec" {
    # Utilise l'AZ CLI pour construire et pousser dans l'ACR. L'auth doit être faite localement
    # (az login) ou via une identité managée sur l'agent CI.
    command = "az acr build --registry ${azurerm_container_registry.main.name} --image db-init:latest db-init/"
  }
}


# 🛑 2. Lancement du Job ACI dans le VNet
resource "azurerm_container_group" "db_initializer" {
  name                = "db-init-job"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  # 1. On définit le type ici (argument, pas bloc)
  ip_address_type     = "Private"
  os_type             = "Linux"
  
  # 2. On attache le subnet
  # Use a dedicated subnet for ACI to avoid "OnlyOneServiceAssociationLinkAllowedPerSubnet"
  subnet_ids          = [azurerm_subnet.aci.id]
  
  restart_policy      = "Never"

  # Utiliser une identité managée (User Assigned) pour tirer l'image depuis l'ACR
  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.aci_db_init_identity.id]
  }

  image_registry_credential {
    server                    = azurerm_container_registry.main.login_server
    user_assigned_identity_id = azurerm_user_assigned_identity.aci_db_init_identity.id
    # Note : Pas de username ni de password ici !
  }

  container {
    name   = "db-init-container"
    # Assure-toi que l'image est correcte (login_server/nom:tag)
    image  = "${azurerm_container_registry.main.login_server}/db-init:latest"
    cpu    = 0.5
    memory = 1.0

    # 3. C'EST ICI QU'EST LA SOLUTION
    # On déclare un port factice DANS le conteneur.
    # Terraform va s'en servir pour remplir l'objet "ipAddress" que l'API Azure réclame.
    ports {
      port     = 80
      protocol = "TCP"
    }

    # La commande pour initialiser la DB
    # (J'ai remis ta commande mariadb sur une seule ligne pour éviter les erreurs de syntaxe)
    commands = [
      "sh",
      "-c",
      "mariadb -h ${azurerm_mysql_flexible_server.main.name}.mysql.database.azure.com -u ${var.mysql_admin_username} -p${var.mysql_admin_password} --ssl ${var.project_name} < /init-db.sql"
    ]
    
    # Si tu as besoin de passer des variables d'environnement pour le script
    environment_variables = {
        # ...
    }
  }

  # NOTE: on supprime `image_registry_credential` car l'ACR sera accédé via
  # l'identité managée `azurerm_user_assigned_identity.challenges` qui a déjà
  # la role `AcrPull` (voir `identity.tf`).

  depends_on = [
    null_resource.build_and_push_db_init,
    azurerm_role_assignment.aci_acr_pull,
    azurerm_mysql_flexible_server.main,
    azurerm_private_dns_zone_virtual_network_link.main
  ]
}