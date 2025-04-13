<?php
session_start();

// Génère un flag et simule un service vulnérable
$port = rand(5000, 6000);

if (!isset($_SESSION['flag'])) {
    $_SESSION['flag'] = "FLAG{backdoor_" . bin2hex(random_bytes(4)) . "}";
    file_put_contents("/tmp/flag_" . session_id() . ".txt", $_SESSION['flag']);
    $cmd = "nohup bash -c 'echo Welcome agent. The secret lies in /tmp/flag_" . session_id() . ".txt && nc -l -p $port -q 0 < /tmp/flag_" . session_id() . ".txt' >/dev/null 2>&1 &";
    exec($cmd);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 04 : Exploitation de Backdoor</title>
  <style>
    body {
      background-color: #0d0d0d;
      color: #f2f2f2;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #1a1a1a;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 4px solid #FF5722;
    }

    header h1 {
      font-size: 2.8em;
      margin: 0;
      color: #FF5722;
      letter-spacing: 2px;
    }

    header .subtitle {
      margin-top: 10px;
      font-size: 1.1em;
      color: #ccc;
      font-style: italic;
    }

    .container {
      max-width: 900px;
      margin: 60px auto;
      padding: 40px;
      background-color: #1b1b1b;
      border: 2px solid #FF5722;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(255, 87, 34, 0.3);
    }

    h1 {
      color: #FF5722;
      text-align: center;
      font-size: 2.2em;
      margin-bottom: 10px;
    }

    .subtitle {
      text-align: center;
      font-style: italic;
      color: #aaa;
      margin-bottom: 30px;
    }

    .highlight {
      background-color: #111;
      padding: 15px;
      border-left: 5px solid #FF5722;
      margin-bottom: 30px;
    }

    pre {
      background-color: #111;
      padding: 15px;
      border-radius: 5px;
      border: 1px dashed #FF5722;
      overflow-x: auto;
    }

    form {
      margin-top: 30px;
      text-align: center;
    }

    input[type="text"] {
      padding: 10px;
      width: 60%;
      font-size: 1em;
      background-color: #333;
      color: #FF5722;
      border: 1px solid #FF5722;
      border-radius: 5px;
    }

    button {
      padding: 10px 20px;
      background-color: #FF5722;
      border: none;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
      margin-left: 10px;
      cursor: pointer;
    }

    .result {
      margin-top: 20px;
      font-size: 1.1em;
      font-weight: bold;
    }

    .back-button {
      position: absolute;
      top: 20px;
      right: 20px;
      background-color: #FF5722;
      color: #212121;
      text-decoration: none;
      padding: 10px 14px;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.2em;
      box-shadow: 0 0 10px rgba(255, 87, 34, 0.3);
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .back-button:hover {
      background-color: #FF3D00;
      transform: scale(1.1);
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      font-size: 0.9em;
      border-top: 2px solid #FF5722;
      margin-top: 60px;
    }
  </style>
</head>
<body>

<a href="/" class="back-button" title="Retour à l'accueil">↩</a>

<header>
  <h1>🕵️ Dossier 04 : Exploitation de Backdoor</h1>
  <p class="subtitle">Un service suspect écoute dans l’ombre... identifiez-le et récupérez le flag avant qu’il ne soit trop tard.</p>
</header>

<div class="container">
  <h1>Dossier 04 : Exploitation de Backdoor</h1>
  <p class="subtitle">Difficulté : Expert | Thème : Pentest & Réseau</p>

  <div class="highlight">
    <p>🎯 <strong>Mission :</strong> Un backdoor actif s'est glissé dans le réseau. Il écoute silencieusement sur un port inconnu. Votre objectif est de le repérer, de vous y connecter, et de récupérer le flag caché dans le système.</p>
  </div>

  <p><strong>🛠️ Outils recommandés :</strong></p>
  <ul>
    <li><code>nmap -p 5000-6000 [IP du serveur]</code> pour scanner les ports ouverts.</li>
    <li><code>nc [IP] [port]</code> pour dialoguer avec le backdoor.</li>
  </ul>

  <p><strong>📡 Un port a été ouvert automatiquement pour cette session :</strong> <code><?php echo $port; ?></code></p>

  <pre>
nmap -p 5000-6000 [adresse_du_serveur]
nc [adresse_du_serveur] <?php echo $port; ?>
  </pre>
</div>

<footer>
  <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Mission numérique par vos agents spéciaux</p>
</footer>

</body>
</html>
