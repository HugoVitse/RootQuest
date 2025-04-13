<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 02 : Message Caché - Apocalypse Cybernétique</title>
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
      border-bottom: 4px solid #FF5722;
    }

    h1 {
      font-size: 2.8em;
      margin: 0;
      color: #FF5722;
      letter-spacing: 2px;
    }

    .subtitle {
      margin-top: 10px;
      font-size: 1.1em;
      color: #ccc;
      font-style: italic;
    }

    section {
      padding: 50px 20px;
      max-width: 1100px;
      margin: auto;
    }

    h2 {
      font-size: 1.8em;
      border-left: 6px solid #FF5722;
      padding-left: 15px;
      margin-bottom: 20px;
    }

    p {
      line-height: 1.6;
    }

    .challenge-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 25px;
      margin-top: 30px;
    }

    .challenge-card {
      background-color: #1b1b1b;
      border: 2px solid #FF5722;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 0 20px rgba(255, 87, 34, 0.1);
      transition: all 0.3s ease;
      position: relative;
    }

    .challenge-card::before {
      content: "DOSSIER";
      position: absolute;
      top: -15px;
      left: 15px;
      font-size: 0.75em;
      background: #FF5722;
      color: #000;
      padding: 2px 8px;
      font-weight: bold;
      border-radius: 3px;
    }

    .challenge-card:hover {
      box-shadow: 0 0 25px rgba(255, 87, 34, 0.3);
      transform: translateY(-5px);
    }

    .challenge-title {
      font-size: 1.3em;
      color: #FF5722;
      margin-bottom: 10px;
    }

    .difficulty {
      font-size: 0.9em;
      padding: 4px 8px;
      border-radius: 5px;
      background-color: #333;
      display: inline-block;
      margin-bottom: 10px;
      border: 1px solid #FF5722;
      color: #FF5722;
    }

    .theme {
      font-size: 0.95em;
      margin-bottom: 10px;
      color: #ccc;
      font-style: italic;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      font-size: 0.9em;
      border-top: 2px solid #FF5722;
    }

    .flag-validation {
      margin-top: 30px;
      background-color: #1b1b1b;
      border: 2px solid #FF5722;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
    }

    .flag-input {
      padding: 10px;
      font-size: 1em;
      margin-bottom: 10px;
      border: 1px solid #FF5722;
      border-radius: 5px;
      background-color: #333;
      color: #FF5722;
    }

    .flag-submit {
      padding: 10px 20px;
      background-color: #FF5722;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .flag-submit:hover {
      background-color: #e64a19;
    }

    .validation-result {
      margin-top: 15px;
      font-size: 1.2em;
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

  </style>
</head>
<body>

<a href="/" class="back-button" title="Retour à l'accueil">↩</a>

  <header>
    <h1>🕵️ Dossier 02 : Message Caché</h1>
    <p class="subtitle">Analysez le code source et découvrez le message secret caché dans un commentaire.</p>
  </header>

  <section>
    <h2>🎯 Objectif de la mission</h2>
    <p>
      L’attaque virale s’intensifie, et dans le code source du réseau, un message secret pourrait détenir des informations cruciales pour contrer l’assaut. Vous devrez fouiller dans le code source du site et découvrir un message caché dans un commentaire ou sous une forme codée.
      Le temps presse, agent ! Décryptez le message et trouvez le flag caché pour passer au niveau suivant.
    </p>

    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-title">Dossier 02 : Message Caché</div>
        <div class="difficulty">Moyen</div>
        <div class="theme">Thème : Analyse de code source et décodage</div>
        <p>Le code source du site cache un message secret dans un commentaire obscur. Utilisez vos compétences en recherche de code source pour le trouver et décoder le message.</p>
             <!-- 
    Voici un commentaire caché. 
    Le message secret est encodé ici : 
    U29ycnksX2ludmFsaW9uX2F0dGFja19uZXh0
    -->
    </div>
    </div>
  </section>

  <footer>
    <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Créé par votre équipe d'enquêteurs numériques</p>
  </footer>

</body>
</html>
