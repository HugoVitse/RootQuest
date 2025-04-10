<?php
$flag = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    if ($username === 'admin' && $password === 'password123') {
        $flag = 'FLAG{admin_password123}';
        echo "<script>alert('Connexion réussie, agent. Flag : $flag'); window.location.href = \"/\";</script>";
    } else {
        echo "<script>document.getElementById('errorMessage').style.display = 'block';</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dossier 01 – Authentification JS</title>
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

    input[type="text"], input[type="password"] {
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
    <h1>🕵️ Dossier 01 : Accès restreint</h1>
    <p class="subtitle">Challenge d'authentification JavaScript - Niveau : Facile</p>
  </header>

  <section>
    <h2>🔐 Zone sécurisée</h2>
    <p>
      Agent, entrez vos identifiants pour tenter de franchir cette première couche de sécurité.
    </p>

    <form id="loginForm" method="POST">
      <label for="username">Nom d'utilisateur :</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" required>

      <button type="submit">Se connecter</button>
      <p id="errorMessage">Nom d'utilisateur ou mot de passe incorrect.</p>
    </form>
  </section>

  <footer>
    <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés</p>
  </footer>

</body>
</html>


<script>
    const correctUsername = "admin";
    const correctPassword = "password123";
</script>