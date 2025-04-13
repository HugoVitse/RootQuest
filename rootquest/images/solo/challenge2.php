<?php
$flag = null;
$error = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $motDePasseCorrect = "cpasbiendurmotdepasse";

  if (isset($_POST['password']) && $_POST['password'] === $motDePasseCorrect) {
    $flag = "FLAG{encodage_maîtrisé_007}";
  } else {
    $error = true;
  }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dossier 02 – Obfuscation Encodée</title>
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

    .form-container {
      margin-top: 30px;
      background-color: #111;
      border: 2px dashed #FFD700;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #FFD700;
    }

    input[type="password"] {
      padding: 12px;
      font-size: 1em;
      background-color: #1c1c1c;
      border: 1px solid #FFD700;
      border-radius: 8px;
      color: #FFD700;
      font-family: monospace;
      width: 100%;
      margin-bottom: 20px;
    }

    button {
      background-color: #FFD700;
      color: #0d0d0d;
      padding: 12px 25px;
      font-size: 1em;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      margin-top: 10px;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    button:hover {
      background-color: #e6c200;
      transform: scale(1.05);
    }

    .flag {
      background-color: #2c2c2c;
      border-left: 4px solid limegreen;
      padding: 15px;
      font-weight: bold;
      margin-top: 30px;
    }

    .error {
      color: red;
      margin-top: 15px;
      font-weight: bold;
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

<a href="/" class="back-button" title="Retour à l'accueil">↩</a>

<header>
  <h1>🕵️ Dossier 02 : Obfuscation Encodée</h1>
  <p class="subtitle">Challenge moyen – Des secrets bien camouflés...</p>
</header>

<section>
  <h2>🧠 Analyse cryptée</h2>
  <p>
    Le mot de passe semble illisible à première vue. Mais tout bon analyste sait que les apparences sont trompeuses...
  </p>

  <div class="form-container">
    <form method="POST">
      <label for="password">🔐 Entrez le mot de passe :</label>
      <input type="password" name="password" id="password" placeholder="•••••••••••••••••" required />
      <div style="text-align: center;">
        <button type="submit">🕵️‍♂️ Décrypter</button>
      </div>

      <?php if ($error): ?>
        <p class="error">❌ Mauvais mot de passe / Wrong password</p>
      <?php endif; ?>
    </form>

    <?php if (!empty($flag)): ?>
      <div class="flag">🎉 Flag : <?= htmlspecialchars($flag) ?></div>
    <?php endif; ?>
  </div>
</section>

<footer>
  <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés <!-- var pass = '%63%70%61%73%62%69%65%6e%64%75%72%70%61%73%73%77%6f%72%64'--></p>
</footer>

</body>
</html>
