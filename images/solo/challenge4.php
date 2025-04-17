<?php
session_start();

$flag = null;
$error = false;

// Fonction de validation du JWT
function validerJWT($jwt) {
  $sections = explode('.', $jwt);
  if (count($sections) !== 3) return false;

  [$headerB64, $payloadB64, $signature] = $sections;

  $payloadJson = base64_decode(strtr($payloadB64, '-_', '+/'));
  $payload = json_decode($payloadJson, true);

  // Vérifie simplement si le rôle est "admin"
  if (isset($payload['role']) && $payload['role'] === 'admin') {
    return true;
  }

  return false;
}

// Simulation de login (aucune base de données ici)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'] ?? '';
  $password = $_POST['password'] ?? '';

  // Simule un utilisateur légitime
  if ($username === 'admin' && $password === 'jwtmaster') {
    // Simule un JWT avec rôle admin (aucune signature réelle ici)
    $header = base64_encode(json_encode(['alg' => 'none', 'typ' => 'JWT']));
    $payload = base64_encode(json_encode(['username' => $username, 'role' => 'admin']));
    $jwt = "$header.$payload.signature";

    setcookie('session', $jwt, time() + 3600, '/');
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
  } else {
    $error = true;
  }
}

// Vérifie si l'utilisateur est authentifié avec un rôle admin
if (isset($_COOKIE['session']) && validerJWT($_COOKIE['session'])) {
  $flag = "FLAG{contrôle_d'accès_révélé}";
}
?>

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

    .error {
      color: red;
      font-weight: bold;
      margin-top: 10px;
    }

    .flag {
      margin-top: 30px;
      background-color: #222;
      border-left: 5px solid limegreen;
      padding: 20px;
      font-weight: bold;
      font-size: 1.2em;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      border-top: 2px solid #FFD700;
      font-size: 0.9em;
    }

    .back-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: #FFD700;
      color: #000;
      text-decoration: none;
      padding: 10px 14px;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.2em;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .back-button:hover {
      background-color: #e6c200;
      transform: scale(1.1);
    }
  </style>
</head>
<body>
<a href="/challenge.php" class="back-button" title="Retour à l'accueil">↩</a>

<header>
  <h1>🕵️ Dossier 04 : Attaque de session et contrôle d'accès</h1>
  <p class="subtitle">Challenge expert – Manipulation avancée des cookies et des tokens JWT...</p>
</header>

<section>
  <h2>🔐 Contrôle d'accès via JWT</h2>
  <p>
    Vous avez intercepté un cookie contenant un JWT. Ce cookie est utilisé pour maintenir la session et contrôler l'accès aux pages protégées.
    Mais que se passerait-il si vous pouviez manipuler ce JWT pour devenir un administrateur ?
  </p>

  <?php if (!$flag): ?>
    <form method="POST">
      <label for="username">Nom d'utilisateur :</label>
      <input type="text" id="username" name="username" required />

      <label for="password">Mot de passe :</label>
      <input type="password" id="password" name="password" required />

      <button type="submit">Se connecter</button>

      <?php if ($error): ?>
        <p class="error">❌ Accès refusé. Données incorrectes.</p>
      <?php endif; ?>
    </form>
  <?php else: ?>
    <div class="flag">🎉 Flag : <?= htmlspecialchars($flag) ?></div>
  <?php endif; ?>
</section>

<footer>
  <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés</p>
</footer>
</body>
</html>
