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
      border-bottom: 4px solid #00ffc3;
    }

    header h1 {
      font-size: 2.8em;
      margin: 0;
      color: #00ffc3;
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
      border: 2px solid #00ffc3;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(255, 87, 34, 0.3);
    }

    h1 {
      color: #00ffc3;
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
      border-left: 5px solid #00ffc3;
      margin-bottom: 30px;
    }

    pre {
      background-color: #111;
      padding: 15px;
      border-radius: 5px;
      border: 1px dashed #00ffc3;
      overflow-x: auto;
    }

    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: #00ffc3;
      color: #000;
      text-decoration: none;
      border-radius: 50%;
      font-weight: bold;
      font-size: 1.4em;
      box-shadow: 0 0 15px rgba(0, 255, 127, 0.3);
      transition: transform 0.3s, background-color 0.3s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 46px;
      height: 46px;
    }

    .back-button:hover {
      background-color: #00e06f;
      transform: scale(1.1);
    }

    @media (max-width: 600px) {
      .back-button {
        font-size: 1.2em;
      }

      h1 {
        font-size: 1.8em;
        text-align: center;
      }
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      font-size: 0.9em;
      border-top: 2px solid #00ffc3;
      margin-top: 60px;
    }
  </style>
</head>
<body>

<header>
  <a href="/apocalypse.php" class="back-button" title="Retour à l'accueil">↩</a>
  <h1>🕵️ Dossier 04 : Exploitation de Backdoor</h1>
  <p class="subtitle">Quelque chose rôde sur le réseau. Une présence silencieuse. Saurez-vous écouter ?</p>
</header>

<div class="container">
  <h1>Mission clandestine : écoute suspecte détectée</h1>
  <p class="subtitle">Niveau : 🟥 Expert | Spécialité : Pentest Réseau</p>

  <div class="highlight">
    <p>🔍 <strong>Contexte :</strong> Un service backdoor inconnu a été identifié. Il se cache, prêt à livrer un secret... mais seulement aux oreilles les plus attentives. Ce service écoute sur un port aléatoire, quelque part entre <code>5000</code> et <code>6000</code>.</p>
  </div>

  <p>🎯 <strong>Objectif :</strong> Retrouvez le port utilisé. Écoutez. Obtenez le flag.</p>

  <p><strong>🔧 Outils d’enquête recommandés :</strong></p>
  <ul>
    <li><code>nmap -p 5000-6000 [adresse_du_serveur]</code> : pour balayer les ports en quête de l’intru.</li>
    <li><code>nc [adresse_du_serveur] [port]</code> : pour établir un contact et extraire l’information.</li>
  </ul>

  <p><strong>📡 Intelligence en temps réel :</strong> Un port a été ouvert rien que pour vous, agent :</p>
  <pre><code>nc [adresse_du_serveur] <?php echo $port; ?></code></pre>

  <p>Rappelez-vous : parfois, les secrets sont chuchotés dans les recoins les plus sombres du réseau...</p>
</div>

<footer>
  <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Exercice confidentiel réservé aux agents certifiés</p>
</footer>

</body>
</html>
