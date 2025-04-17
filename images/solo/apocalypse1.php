<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 01 : Contamination des Fichiers</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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

    .container {
      max-width: 900px;
      margin: 60px auto;
      padding: 40px;
      background-color: #1b1b1b;
      border: 2px solid #00ffc3;
      border-radius: 15px;
      box-shadow: 0 0 20px rgba(255, 87, 34, 0.3);
    }

    h2 {
      text-align: center;
      font-size: 2em;
      color: #00ffc3;
      margin-bottom: 30px;
    }

    .subtitle, .theme, .difficulty {
      text-align: center;
      color: #aaa;
      margin-bottom: 20px;
    }

    .difficulty {
      background-color: #00ffc3;
      color: #000;
      font-size: 0.95em;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: bold;
      display: inline-block;
    }

    .highlight {
      background-color: #111;
      padding: 20px;
      border-left: 5px solid #00ffc3;
      margin-bottom: 30px;
      font-size: 1.05em;
      color: #ccc;
      line-height: 1.6;
    }

    .download-link {
      display: block;
      width: fit-content;
      margin: 30px auto 0;
      background-color: #00ffc3;
      color: #000;
      padding: 12px 24px;
      border-radius: 30px;
      text-decoration: none;
      font-weight: bold;
      font-size: 1em;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .download-link:hover {
      background-color: #00e06f;
      transform: scale(1.05);
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
        font-size: 1.8em;
      }

      h2 {
        font-size: 1.6em;
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
  <h1>🧬 Dossier 01 : Contamination des Fichiers</h1>
  <p class="subtitle">Explorez un fichier infecté et débusquez les vérités cachées derrière le code corrompu…</p>
</header>

<div class="container">
  <h2>Mission : Analyse du fichier infecté</h2>
  <div class="difficulty">🟢 Facile</div>
  <div class="theme">Thème : Métadonnées & Exploration</div>

  <div class="highlight">
    <p>📁 <strong>Contexte :</strong> Un fichier mystérieux est tombé entre nos mains. Il semble inoffensif… mais nos scanners ont détecté des anomalies. Métadonnées anormales, structures corrompues, chaînes suspectes. Votre rôle : inspecter, analyser, fouiller chaque bit.</p>
  </div>

  <a href="./apocalypse1.jpg" download class="download-link">⬇ Télécharger le fichier corrompu</a>
  
</div>

<footer>
  <p>&copy; 2025 – CTF Missions Sécurisées. Tous droits réservés.</p>
</footer>

</body>
</html>
