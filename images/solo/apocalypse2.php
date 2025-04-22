<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 02 : Message Caché - Apocalypse Cybernétique</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      height: 100%;
      font-family: 'Courier New', Courier, monospace;
      background-color: #0d0d0d;
      color: #f2f2f2;
    }

    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: #0d0d0d;
      color: #f2f2f2;
      font-family: 'Courier New', Courier, monospace;
      position: relative;
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 50px 20px;
      max-width: 1100px;
      width: 100%;
      margin: auto;
    }


    .back-button {
      position: absolute;
      top: 20px;
      left: 20px;
      background-color: #00ffc3;
      color: #000;
      text-decoration: none;
      padding: 10px 14px;
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
      .flex-header {
        flex-direction: column;
        gap: 10px;
      }

      .back-button {
        font-size: 1.2em;
      }

      h1 {
        font-size: 1.8em;
        text-align: center;
      }
    }

    header {
      background-color: #1a1a1a;
      padding: 60px 20px 40px;
      text-align: center;
      border-bottom: 4px solid #00ffc3;
    }

    h1 {
      font-size: 2.8em;
      color: #00ffc3;
      letter-spacing: 2px;
    }

    .subtitle {
      margin-top: 10px;
      font-size: 1.1em;
      color: #ccc;
      font-style: italic;
    }

    h2 {
      font-size: 1.8em;
      border-left: 6px solid #00ffc3;
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
      border: 2px solid #00ffc3;
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
      background: #00ffc3;
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
      color: #00ffc3;
      margin-bottom: 10px;
    }

    .difficulty {
      font-size: 0.9em;
      padding: 4px 8px;
      border-radius: 5px;
      background-color: #333;
      display: inline-block;
      margin-bottom: 10px;
      border: 1px solid #00ffc3;
      color: #00ffc3;
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
      border-top: 2px solid #00ffc3;
    }
  </style>
</head>
<body>


<header>
  <a href="/apocalypse.php" class="back-button" title="Retour à l'accueil">↩</a>
  <h1>🕵️ Dossier 02 : Message Caché</h1>
  <p class="subtitle">Analysez le code source et découvrez le message secret caché dans un commentaire.</p>
</header>

<main>
  <h2>🎯 Objectif de la mission</h2>
  <p>
    L’attaque virale s’intensifie, et dans le code source du réseau, un message secret pourrait détenir des informations cruciales pour contrer l’assaut. 
    Vous devrez fouiller dans le code source du site et découvrir un message caché dans un commentaire ou sous une forme codée.
    Le temps presse, agent ! Décryptez le message et trouvez le flag caché pour passer au niveau suivant.
  </p>

  <div class="challenge-container">
    <div class="challenge-card">
      <div class="challenge-title">Dossier 02 : Message Caché</div>
      <div class="difficulty">Moyen</div>
      <div class="theme">Thème : Analyse de code source et décodage</div>
      <p>
        Le code source du site cache un message secret dans un commentaire obscur.
        Utilisez vos compétences en recherche de code source pour le trouver et décoder le message.
      </p>
      <!-- 
        Voici un commentaire caché. 
        Le message secret est encodé ici : 
        U29ycnksX2ludmFsaW9uX2F0dGFja19uZXh0
      -->
    </div>
  </div>
</main>

<footer>
  <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Créé par votre équipe d'enquêteurs numériques</p>
</footer>

</body>
</html>
