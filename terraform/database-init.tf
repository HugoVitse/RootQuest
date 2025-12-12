#ACI qui sert a initialiser la db avec un fichier SQL de base
#Il consiste en un container APP light disposant de mariadb se connectant a la db pour injecter le init.db


#trigger quand init.db change (ou son dockerfile) (pour pas destroy la db a chaque terraform apply)
resource "null_resource" "build_and_push_db_init" {
  triggers = {
    file_hash = filemd5("db-init/Dockerfile")
    sql_hash  = filemd5("db-init/init-db.sql")
  }

  provisioner "local-exec" {
    #on build l'image sur acr
    command = "az acr build --registry ${azurerm_container_registry.main.name} --image db-init:latest db-init/"
  }
}

#lancement du ACI
resource "azurerm_container_group" "db_initializer" {
  name                = "db-init-job"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_address_type = "Private"
  os_type         = "Linux"

  subnet_ids = [azurerm_subnet.aci.id] #son propre subnet mais meme vnet que la db

  restart_policy = "Never" #une fois executé le container se détruit tout seul 

  #identité managé
  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.aci_db_init_identity.id]
  }

  #on se log a l'acr
  image_registry_credential {
    server                    = azurerm_container_registry.main.login_server
    user_assigned_identity_id = azurerm_user_assigned_identity.aci_db_init_identity.id
  }

  container {
    name   = "db-init-container"
    image  = "${azurerm_container_registry.main.login_server}/db-init:latest"
    cpu    = 0.5
    memory = 1.0

    #cet attribut est factice, il ne sert a rien cependant terraform plante sans ports...
    ports {
      port     = 80
      protocol = "TCP"
    }

    #initialisation de la db (conneion via mariadb)
    commands = [
      "sh",
      "-c",
      "mariadb -h ${azurerm_mysql_flexible_server.main.name}.mysql.database.azure.com -u ${var.mysql_admin_username} -p${var.mysql_admin_password} --ssl ${var.project_name} < /init-db.sql"
    ]


  }

  #dépendances (
  depends_on = [
    null_resource.build_and_push_db_init,
    azurerm_role_assignment.aci_acr_pull,
    azurerm_mysql_flexible_server.main,
    azurerm_private_dns_zone_virtual_network_link.main
  ]
}