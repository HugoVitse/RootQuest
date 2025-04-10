<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CTF Cyber Sécurité</title>
  <style>
    /* Global Styles */
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f7fc;
      margin: 0;
      padding: 0;
      color: #333;
    }

    a {
      text-decoration: none;
    }

    h1, h2, h3 {
      margin: 0;
      font-family: 'Roboto', sans-serif;
    }

    /* Header Styles */
    .main-header {
      background-color: #343a40;
      color: white;
      padding: 40px 20px;
      text-align: center;
    }

    .title {
      font-size: 3rem;
      margin: 0;
    }

    .subtitle {
      font-size: 1.2rem;
      margin-top: 10px;
      color: #adb5bd;
    }

    /* Theme Container */
    .theme-container {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 20px;
    }

    .theme-card {
      background-color: black;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 20px;
      width: 48%; /* Ajustez la largeur pour que les cartes tiennent côte à côte */
      padding: 20px;
      transition: transform 0.3s ease-in-out;
      text-align: center;
    }

    .theme-card:hover {
      transform: translateY(-10px);
    }

    .theme-title {
      font-size: 1.8rem;
      margin-bottom: 15px;
    }

    .theme-description {
      font-size: 1rem;
      color: #6c757d;
      margin-bottom: 20px;
    }

    .challenge-list {
      list-style-type: none;
      padding: 0;
    }

    .challenge-item {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .challenge-item h3 {
      font-size: 1.2rem;
      color: #495057;
    }

    .difficulty {
      display: inline-block;
      font-size: 0.9rem;
      padding: 5px 10px;
      margin-top: 5px;
      border-radius: 20px;
      text-transform: uppercase;
    }

    .easy {
      background-color: #28a745;
      color: white;
    }

    .medium {
      background-color: #ffc107;
      color: white;
    }

    .hard {
      background-color: #dc3545;
      color: white;
    }

    .expert {
      background-color: #007bff;
      color: white;
    }

    /* Footer */
    .main-footer {
      background-color: #343a40;
      color: white;
      padding: 20px;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
    }
  </style>
</head>
<body>

  <header class="main-header">
    <h1 class="title">CTF Cyber Sécurité</h1>
    <p class="subtitle">Choisissez un thème et relevez les défis pour tester vos compétences en cybersécurité !</p>
  </header>

  <section class="theme-container">
    <!-- Thème 1 : Détective -->
    <div class="theme-card detective">
      <h2 class="theme-title" style="font-size: 2.8em; color: #FFD700; margin-bottom: 15px; letter-spacing: 2px;">🕵️‍♂️ Détective</h2>
      <p class="theme-description" style="font-size: 1.1em; color: #ccc; font-style: italic; margin-bottom: 25px;">Un mystère se cache derrière chaque défi. Détectez des indices, résolvez des énigmes, et déjouez les pièges pour résoudre l'affaire.</p>

      <div class="challenge-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 25px; margin-top: 30px;">
        <div class="challenge-card" style="background-color: #1b1b1b; border: 2px solid #FFD700; border-radius: 10px; padding: 25px; box-shadow: 0 0 20px rgba(255, 215, 0, 0.1); transition: all 0.3s ease; position: relative;">
          <div class="challenge-title" style="font-size: 1.3em; color: #FFD700; margin-bottom: 10px;">Dossier 01 : Authentification JS</div>
          <div class="difficulty" style="font-size: 0.9em; padding: 4px 8px; border-radius: 5px; background-color: #333; border: 1px solid #FFD700; color: #FFD700; display: inline-block; margin-bottom: 10px;">Facile</div>
          <div class="theme" style="font-size: 0.95em; margin-bottom: 10px; color: #ccc; font-style: italic;">Thème : JavaScript côté client</div>
          <p style="line-height: 1.6;">Un script caché dans le front-end vous offre une porte d’entrée. Analysez-le pour contourner l’authentification.</p>
          <a href="challenge1.php" style="color: #FFD700; text-decoration: none; font-weight: bold;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #1b1b1b; border: 2px solid #FFD700; border-radius: 10px; padding: 25px; box-shadow: 0 0 20px rgba(255, 215, 0, 0.1); transition: all 0.3s ease; position: relative;">
          <div class="challenge-title" style="font-size: 1.3em; color: #FFD700; margin-bottom: 10px;">Dossier 02 : Obfuscation Encodée</div>
          <div class="difficulty" style="font-size: 0.9em; padding: 4px 8px; border-radius: 5px; background-color: #333; border: 1px solid #FFD700; color: #FFD700; display: inline-block; margin-bottom: 10px;">Moyen</div>
          <div class="theme" style="font-size: 0.95em; margin-bottom: 10px; color: #ccc; font-style: italic;">Thème : Analyse de chaîne et décodage</div>
          <p style="line-height: 1.6;">Un mot de passe caché derrière des chaînes codées en pourcentage. Trouvez la clé pour déverrouiller l’accès.</p>
          <a href="challenge2.php" style="color: #FFD700; text-decoration: none; font-weight: bold;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #1b1b1b; border: 2px solid #FFD700; border-radius: 10px; padding: 25px; box-shadow: 0 0 20px rgba(255, 215, 0, 0.1); transition: all 0.3s ease; position: relative;">
          <div class="challenge-title" style="font-size: 1.3em; color: #FFD700; margin-bottom: 10px;">Dossier 03 : Cookies Mystérieux</div>
          <div class="difficulty" style="font-size: 0.9em; padding: 4px 8px; border-radius: 5px; background-color: #333; border: 1px solid #FFD700; color: #FFD700; display: inline-block; margin-bottom: 10px;">Difficile</div>
          <div class="theme" style="font-size: 0.95em; margin-bottom: 10px; color: #ccc; font-style: italic;">Thème : Contrôle d'accès par cookies</div>
          <p style="line-height: 1.6;">Des cookies mystérieux détiennent la clé d’un contrôle d’accès. Manipulez-les pour découvrir des privilèges cachés.</p>
          <a href="challenge3.php" style="color: #FFD700; text-decoration: none; font-weight: bold;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #1b1b1b; border: 2px solid #FFD700; border-radius: 10px; padding: 25px; box-shadow: 0 0 20px rgba(255, 215, 0, 0.1); transition: all 0.3s ease; position: relative;">
          <div class="challenge-title" style="font-size: 1.3em; color: #FFD700; margin-bottom: 10px;">Dossier 04 : Attaque sur JWT</div>
          <div class="difficulty" style="font-size: 0.9em; padding: 4px 8px; border-radius: 5px; background-color: #333; border: 1px solid #FFD700; color: #FFD700; display: inline-block; margin-bottom: 10px;">Expert</div>
          <div class="theme" style="font-size: 0.95em; margin-bottom: 10px; color: #ccc; font-style: italic;">Thème : Exploitation de JWT et contrôle d'accès via cookies</div>
          <p style="line-height: 1.6;">Exploitez un JWT mal configuré pour gagner des droits administrateur et obtenir des informations sensibles.</p>
          <a href="challenge4.php" style="color: #FFD700; text-decoration: none; font-weight: bold;">Accéder au dossier →</a>
        </div>
      </div>
    </div>

    <!-- Thème 2 : Apocalypse Cybernétique -->
    <div class="theme-card apocalypse">
    <h2 class="theme-title" style="font-size: 2.8em; color: #FF5722; margin-bottom: 15px; letter-spacing: 2px; text-transform: uppercase;">💻 Apocalypse Cybernétique</h2>
    <p class="theme-description" style="font-size: 1.1em; color: #BDBDBD; font-style: italic; margin-bottom: 25px;">Un virus informatique ravage les systèmes mondiaux. Votre mission : analyser les données, résoudre des défis et sauver les informations vitales.</p>

    <div class="challenge-container" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px; margin-top: 40px;">
        <div class="challenge-card" style="background-color: #2A2A2A; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); transition: all 0.3s ease; position: relative;">
        <div class="challenge-title" style="font-size: 1.5em; color: #FF5722; margin-bottom: 10px;">Dossier 01 : Contamination des Fichiers</div>
        <div class="difficulty" style="font-size: 1em; padding: 5px 15px; border-radius: 50px; background-color: #FF5722; color: #000; margin-bottom: 10px;">Facile</div>
        <p style="line-height: 1.6; color: #BDBDBD;">Un fichier infecté contient des secrets. Explorez les métadonnées et trouvez ce qui se cache dedans.</p>
        <a href="apocalypse_challenge1.php" style="color: #FF5722; text-decoration: none; font-weight: bold; border: 2px solid #FF5722; padding: 5px 15px; border-radius: 5px; transition: background-color 0.3s ease;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #2A2A2A; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); transition: all 0.3s ease; position: relative;">
        <div class="challenge-title" style="font-size: 1.5em; color: #FF5722; margin-bottom: 10px;">Dossier 02 : Message Caché</div>
        <div class="difficulty" style="font-size: 1em; padding: 5px 15px; border-radius: 50px; background-color: #FF5722; color: #000; margin-bottom: 10px;">Moyen</div>
        <p style="line-height: 1.6; color: #BDBDBD;">Un message codé est caché dans le code source d'un site. Résolvez l'énigme pour obtenir un flag secret.</p>
        <a href="apocalypse_challenge2.php" style="color: #FF5722; text-decoration: none; font-weight: bold; border: 2px solid #FF5722; padding: 5px 15px; border-radius: 5px; transition: background-color 0.3s ease;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #2A2A2A; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); transition: all 0.3s ease; position: relative;">
        <div class="challenge-title" style="font-size: 1.5em; color: #FF5722; margin-bottom: 10px;">Dossier 03 : Trafic de Virus</div>
        <div class="difficulty" style="font-size: 1em; padding: 5px 15px; border-radius: 50px; background-color: #FF5722; color: #000; margin-bottom: 10px;">Difficile</div>
        <p style="line-height: 1.6; color: #BDBDBD;">Analysez un paquet réseau corrompu pour découvrir des informations cruciales sur le virus qui se propage.</p>
        <a href="apocalypse_challenge3.php" style="color: #FF5722; text-decoration: none; font-weight: bold; border: 2px solid #FF5722; padding: 5px 15px; border-radius: 5px; transition: background-color 0.3s ease;">Accéder au dossier →</a>
        </div>

        <div class="challenge-card" style="background-color: #2A2A2A; border-radius: 8px; padding: 20px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); transition: all 0.3s ease; position: relative;">
        <div class="challenge-title" style="font-size: 1.5em; color: #FF5722; margin-bottom: 10px;">Dossier 04 : Exploitation de Backdoor</div>
        <div class="difficulty" style="font-size: 1em; padding: 5px 15px; border-radius: 50px; background-color: #FF5722; color: #000; margin-bottom: 10px;">Expert</div>
        <p style="line-height: 1.6; color: #BDBDBD;">Un backdoor est installé dans le réseau. Utilisez des outils d'exploitation pour pénétrer dans le système et en sortir indemne.</p>
        <a href="apocalypse_challenge4.php" style="color: #FF5722; text-decoration: none; font-weight: bold; border: 2px solid #FF5722; padding: 5px 15px; border-radius: 5px; transition: background-color 0.3s ease;">Accéder au dossier →</a>
        </div>
    </div>
    </div>

  </section>

  <footer class="main-footer">
    <p>&copy; 2025 CTF Cyber Sécurité. Tous droits réservés.</p>
  </footer>

</body>
</html>
