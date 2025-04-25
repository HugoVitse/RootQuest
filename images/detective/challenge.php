<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CTF – Dossiers Détective</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

    body {
      font-family: 'Special Elite', monospace;
      background: #1c1c1c url('https://www.transparenttextures.com/patterns/old-mathematics.png');
      color: #e2d8b8;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #2c2c2c;
      text-align: center;
      padding: 50px 20px;
      border-bottom: 5px dashed #c4b15a;
      box-shadow: 0 5px 15px rgba(0,0,0,0.6);
    }

    h1 {
      font-size: 2.8em;
      color: #f0e68c;
      text-shadow: 2px 2px 2px #000;
      margin-bottom: 10px;
    }

    header p {
      font-style: italic;
      color: #aaa066;
    }

    main {
      max-width: 900px;
      margin: 0 auto;
      padding: 30px;
    }

    .intro {
      background-color: rgba(34,34,34,0.9);
      padding: 25px;
      margin-bottom: 40px;
      border-left: 5px solid #d1b45a;
      font-style: italic;
      line-height: 1.6em;
    }

    .challenge-card {
      border: 2px dashed #d1b45a;
      background-color: rgba(45, 45, 45, 0.9);
      padding: 25px;
      margin-bottom: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      transition: background-color 0.3s, transform 0.2s;
      text-decoration: none;
      color: inherit;
      display: block;
    }

    .challenge-card:hover {
      background-color: #3a3a3a;
      transform: scale(1.01);
      cursor: pointer;
    }

    .challenge-title {
      font-size: 1.5em;
      color: #ffe066;
      margin-bottom: 8px;
    }

    .challenge-desc {
      font-style: italic;
      color: #ccc68b;
    }
    
    button {
      background-color: #bfa741;
      color: #1a1a1a;
      font-weight: bold;
      padding: 10px 18px;
      margin-top: 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .difficulty {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .easy {
    background-color: #4caf50;
    color: #fff;
  }

  .medium {
    background-color: #ff9800;
    color: #fff;
  }

  .hard {
    background-color: #f44336;
    color: #fff;
  }
  </style>
</head>
<body>
  <header>
    <h1>🕵️ Défis Détective</h1>
    <p>Analysez, infiltrez, déchiffrez… comme un vrai agent de l’ombre.</p>
  </header>

  <main>
  <div class="intro">
    L’agence vous contacte en urgence. Une série de cyber-incidents a été détectée dans plusieurs organisations sensibles...
  </div>

  <a href="challenge1.php" class="challenge-card">
    <div class="challenge-title">Dossier 01 : Authentification JS</div>
    <span class="difficulty easy">Easy</span>
    <p class="challenge-desc">Un formulaire d’authentification à première vue classique… mais le mot de passe est caché dans le code même du site. Fouillez le JavaScript, identifiez les failles.</p>
    <p style="margin-top: 12px; color: #f0e68c; font-weight: bold;">🔎 Accéder au dossier confidentiel →</p>
  </a>

  <a href="challenge2.php" class="challenge-card">
    <div class="challenge-title">Dossier 02 : Obfuscation Encodée</div>
    <span class="difficulty medium">Medium</span>
    <p class="challenge-desc">Un message brouillé, chiffré, transformé… mais pas invincible. Mettez à l’épreuve vos compétences en décodage pour déterrer la vérité.</p>
    <p style="margin-top: 12px; color: #f0e68c; font-weight: bold;">🔎 Accéder au dossier confidentiel →</p>
  </a>

  <a href="challenge3.php" class="challenge-card">
    <div class="challenge-title">Dossier 03 : Cookies Mystérieux</div>
    <span class="difficulty medium">Medium</span>
    <p class="challenge-desc">Des cookies suspects sont injectés à l’utilisateur. Et s’ils cachaient une porte dérobée ? Altérez, manipulez, retournez le système contre lui-même.</p>
    <p style="margin-top: 12px; color: #f0e68c; font-weight: bold;">🔎 Accéder au dossier confidentiel →</p>
  </a>

  <a href="challenge4.php" class="challenge-card">
    <div class="challenge-title">Dossier 04 : Attaque sur JWT</div>
    <span class="difficulty hard">Hard</span>
    <p class="challenge-desc">Un jeton JWT mal conçu, un accès administrateur trop confiant. L’occasion rêvée de manipuler les algorithmes à votre avantage.</p>
    <p style="margin-top: 12px; color: #f0e68c; font-weight: bold;">🔎 Accéder au dossier confidentiel →</p>
  </a>

  </main>
</body>
</html>
