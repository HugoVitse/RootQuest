<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Challenge - Dossier 01 : Contamination des Fichiers</title>
  <style>
    body {
      font-family: 'Courier New', Courier, monospace;
      background-color: #212121;
      color: #f2f2f2;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #1a1a1a;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 4px solid #FF5722;
    }

    h1 {
      font-size: 3em;
      margin: 0;
      color: #FF5722;
      text-shadow: 2px 2px 10px rgba(255, 87, 34, 0.7);
    }

    .subtitle {
      font-size: 1.2em;
      color: #ccc;
      font-style: italic;
      margin-top: 10px;
    }

    section {
      padding: 50px 20px;
      max-width: 1200px;
      margin: auto;
    }

    h2 {
      font-size: 2em;
      color: #FF5722;
      text-align: center;
      margin-bottom: 30px;
      text-shadow: 2px 2px 10px rgba(255, 87, 34, 0.5);
    }

    .challenge-container {
      display: flex;
      justify-content: center;
      gap: 50px;
      flex-direction: column;
      align-items: center;
    }

    .challenge-card {
      background-color: #333;
      border: 2px solid #FF5722;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 0 30px rgba(255, 87, 34, 0.3);
      position: relative;
      max-width: 600px;
      margin-top: 40px;
      text-align: center;
    }

    .challenge-card::before {
      content: "DOSSIER INFECTÉ";
      position: absolute;
      top: -20px;
      left: 15px;
      font-size: 1.2em;
      background: #FF5722;
      color: #212121;
      padding: 5px 15px;
      font-weight: bold;
      border-radius: 5px;
      text-shadow: 2px 2px 10px rgba(255, 87, 34, 0.7);
    }

    .challenge-card:hover {
      transform: scale(1.05);
      box-shadow: 0 0 40px rgba(255, 87, 34, 0.5);
    }

    .challenge-title {
      font-size: 1.6em;
      color: #FF5722;
      margin-bottom: 20px;
      text-shadow: 1px 1px 5px rgba(255, 87, 34, 0.5);
    }

    .difficulty {
      font-size: 1.1em;
      background-color: #212121;
      padding: 8px 12px;
      color: #FF5722;
      border: 1px solid #FF5722;
      border-radius: 5px;
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .theme {
      font-size: 1.2em;
      color: #bbb;
      margin-bottom: 15px;
      font-style: italic;
    }

    .infection-text {
      font-size: 1.1em;
      color: #bbb;
      margin-top: 20px;
      line-height: 1.6;
    }

    .file-download {
      margin-top: 20px;
      background-color: #FF5722;
      color: #212121;
      padding: 12px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-size: 1.2em;
      font-weight: bold;
      display: inline-block;
    }

    .file-download:hover {
      background-color: #FF3D00;
    }

    .flag-validation {
      margin-top: 50px;
      background-color: #333;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(255, 87, 34, 0.3);
      text-align: center;
    }

    .flag-input {
      padding: 10px;
      font-size: 1em;
      margin-bottom: 10px;
      border: 1px solid #FF5722;
      border-radius: 5px;
      background-color: #212121;
      color: #FF5722;
    }

    .flag-submit {
      padding: 12px 30px;
      background-color: #FF5722;
      color: #212121;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
    }

    .flag-submit:hover {
      background-color: #FF3D00;
    }

    .validation-result {
      margin-top: 15px;
      font-size: 1.2em;
    }

    footer {
      background-color: #1a1a1a;
      text-align: center;
      padding: 20px;
      color: #ccc;
      font-size: 0.9em;
      border-top: 2px solid #FF5722;
    }
  </style>
</head>
<body>

  <header>
    <h1>🕵️ CTF : Apocalypse Cybernétique</h1>
    <p class="subtitle">Déchiffrez le secret caché dans un fichier contaminé !</p>
  </header>

  <section>
    <h2>Dossier 01 : Contamination des Fichiers</h2>
    
    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-title">Analyse des Fichiers Infectés</div>
        <div class="difficulty">Facile</div>
        <div class="theme">Thème : Métadonnées et Exploration de Fichiers</div>
        <p class="infection-text">
          Vous avez récupéré un fichier infecté par un virus mystérieux. Ce fichier contient des métadonnées cruciales qui, une fois explorées, pourraient révéler un secret caché. Cependant, soyez vigilant : chaque mouvement dans le fichier pourrait déclencher une nouvelle infection.
        </p>
        
        <p><strong>Téléchargez le fichier infecté pour commencer l'analyse :</strong></p>
        <a href="contamination_fichier_corrompu.txt" download class="download-link">Télécharger le fichier corrompu →</a>
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; 2025 CTF Challenge - Apocalypse Cybernétique. Tous droits réservés.</p>
  </footer>

</body>
</html>
