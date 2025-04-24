<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$admin_flag = "CTF{H1dd3n_Adm1n_Access}";

function check_vulnerability($param) {
    return isset($param) && $param === 'admin';
}

function check_secret($param) {
    $decoded_param = urldecode($param);
    return isset($param) && strpos($decoded_param, '?rootquest') !== false;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 04 : Interpréteur Trompeur</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      background-color: #0d0d0d;
      color: #f2f2f2;
      font-family: 'Courier New', Courier, monospace;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    header {
      background-color: #1a1a1a;
      padding: 50px 20px;
      text-align: center;
      border-bottom: 4px solid #00ffc3;
      box-shadow: 0 4px 20px rgba(0, 255, 195, 0.4);
    }

    header h1 {
      font-size: 3em;
      margin: 0;
      color: #00ffc3;
      letter-spacing: 3px;
    }

    header .subtitle {
      margin-top: 15px;
      font-size: 1.2em;
      color: #ccc;
      font-style: italic;
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
      width: 50px;
      height: 50px;
    }

    .back-button:hover {
      background-color: #00e06f;
      transform: scale(1.1);
    }

    .container {
      max-width: 1000px;
      margin: 70px auto;
      padding: 40px;
      background-color: #1b1b1b;
      border: 2px solid #00ffc3;
      border-radius: 15px;
      box-shadow: 0 0 30px rgba(255, 87, 34, 0.3);
    }

    h2 {
      text-align: center;
      font-size: 2.5em;
      color: #00ffc3;
      margin-bottom: 30px;
    }

    .highlight {
      background-color: #121212;
      padding: 20px 25px;
      margin: 30px 0;
      border-left: 5px solid #00ffc3;
      border-radius: 8px;
      color: #ccc;
      font-size: 1.1em;
      line-height: 1.6;
      box-shadow: 0 0 15px rgba(0,255,195,0.1);
    }

    .flag-container {
      text-align: center;
      margin-top: 60px;
    }

    .flag-box {
      background-color: #0f0f0f;
      padding: 40px 30px;
      border-radius: 15px;
      border: 2px solid #00ffc3;
      box-shadow: 0 0 25px rgba(0,255,195,0.3);
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .flag-box h2 {
      color: #00ffc3;
      font-size: 2.5em;
      margin-bottom: 20px;
      text-shadow: 0 0 10px #00ffc3;
    }

    .flag {
      background-color: #121212;
      padding: 25px 20px;
      border-radius: 10px;
      border: 3px dashed #00ffc3;
      display: inline-block;
      box-shadow: 0 0 20px rgba(0, 255, 127, 0.4);
      font-size: 2em;
      color: #00ffc3;
      letter-spacing: 1.5px;
      font-weight: bold;
      animation: pulse 1.8s infinite;
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
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

    @media (max-width: 600px) {
      h1 {
        font-size: 2.2em;
      }

      h2 {
        font-size: 2em;
      }

      .back-button {
        font-size: 1.2em;
      }

      .container {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>

<header>
  <a href="/apocalypse.php" class="back-button" title="Retour à l'accueil">↩</a>
  <h1>🧪 Dossier 04 : Interpréteur Trompeur</h1>
  <p class="subtitle">Quand l'encodage et les chemins détournés deviennent des armes.</p>
</header>

<div class="container">
  <h2>Mission : Trompez l'interpréteur</h2>
  <p class="subtitle">Niveau : 🟨 Intermédiaire | Spécialité : Paramètres & Encodage</p>

  <div class="highlight">
    🧠 <strong>Contexte :</strong> Un simple paramètre dans l’URL peut cacher plus qu’il n’y paraît.
    Le serveur analyse le paramètre <code>page</code>, mais il pourrait être plus naïf qu'on ne le pense...
    À vous de trouver comment l’interpréter pour révéler ce qu’il ne devrait pas montrer.
  </div>

  <?php
  if (isset($_GET['page'])) {
    $page = $_GET['page'];

    if (check_vulnerability($page)) {
      echo "<div class='highlight'>";
      echo "<h3 style='color:#00ffc3;'>🔓 Accès partiel obtenu</h3>";
      echo "<p>Le système reconnaît votre tentative. Mais ce n’est pas encore l’accès complet.</p>";
      echo "<p><strong>Indice :</strong> Seuls les plus curieux atteignent les privilèges suprêmes. Une <em>quête vers le root</em> vous attend... certains noms de plateforme peuvent éclairer votre chemin 🤫</p>";
      echo "<p>💡 Essayez d’enrichir cette URL avec un paramètre supplémentaire. Le point d’interrogation est souvent un bon début.<br><code>?page=admin%3F...</code></p>";
      echo "</div>";
    }
    elseif (check_secret($page)) {
      echo "<div class='flag-container'>";
      echo "<div class='flag-box'>";
      echo "<h2>✅ Accès Administrateur Autorisé</h2>";
      echo "<div class='flag'>CTF{H1dd3n_Adm1n_Access}</div>";
      echo "</div>";
      echo "</div>";
    } else {
      echo "<h2>🔍 Accès refusé</h2>";
      echo "<p>Ce paramètre ne mène à rien d'intéressant. L’encodage correct et le bon contenu sont essentiels pour percer le secret.</p>";
    }
  } else {
    echo "<div style='text-align: center; margin-top: 100px;'>";
    echo "<h2>Bienvenue dans l’épreuve</h2>";
    echo "<p>Manipulez l’URL avec le paramètre <code>?page=...</code> pour commencer votre enquête.</p>";
    echo "</div>";
  }
  ?>

  <p style="text-align: center; margin-top: 40px;">🔎 Essayez différentes combinaisons de paramètres :<br><strong>/apocalypse4.php?page=...</strong></p>
</div>

<footer>
  <p>&copy; 2025 CTF Challenge - Tous droits réservés. | L'encodage est un art</p>
</footer>

</body>
</html>