<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CTF Cybersécurité – Enquête numérique</title>
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
      font-size: 2.8em;
      margin: 0;
      color: #FFD700;
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
      border-left: 6px solid #FFD700;
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
      border: 2px solid #FFD700;
      border-radius: 10px;
      padding: 25px;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;
    }

    .challenge-card::before {
      content: "DOSSIER";
      position: absolute;
      top: -15px;
      left: 15px;
      font-size: 0.75em;
      background: #FFD700;
      color: #000;
      padding: 2px 8px;
      font-weight: bold;
      border-radius: 3px;
    }

    .challenge-card:hover {
      box-shadow: 0 0 25px rgba(255, 215, 0, 0.3);
      transform: translateY(-5px);
    }

    .challenge-title {
      font-size: 1.3em;
      color: #FFD700;
      margin-bottom: 10px;
    }

    .difficulty {
      font-size: 0.9em;
      padding: 4px 8px;
      border-radius: 5px;
      background-color: #333;
      display: inline-block;
      margin-bottom: 10px;
      border: 1px solid #FFD700;
      color: #FFD700;
    }

    .theme {
      font-size: 0.95em;
      margin-bottom: 10px;
      color: #ccc;
      font-style: italic;
    }

    a {
      color: #FFD700;
      text-decoration: none;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      font-size: 0.9em;
      border-top: 2px solid #FFD700;
    }

    .flag-validation {
      margin-top: 30px;
      background-color: #1b1b1b;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
      border: 4px solid;
      border-image: linear-gradient(to right, #FFD700, #FF5722);
      border-image-slice: 1;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
    }

    .flag-input {
      padding: 10px;
      font-size: 1em;
      margin-bottom: 10px;
      border: 3px solid;
      border-image: linear-gradient(to right, #FFD700, #FF5722);
      border-image-slice: 1;
      border-radius: 5px;
      background-color: #333;
      color: #FFD700;
    }


    .flag-submit {
      padding: 10px 20px;
      background-color: #FFD700;
      color: #000;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }

    .flag-submit:hover {
      background-color: #e6b800;
    }

    .validation-result {
      margin-top: 15px;
      font-size: 1.2em;
    }

    /* Styles spécifiques à Apocalypse Cybernétique */
    .theme-card.apocalypse .challenge-card {
      border: 2px solid #FF5722; 
    }

    .theme-card.apocalypse {
      margin-top: 100px;
      margin-bottom: 80px;
    }

    .theme-card.apocalypse .difficulty {
      border: 1px solid #FF5722; 
      color: #FF5722; 
    }

    .theme-card.apocalypse .challenge-title {
      color: #FF5722; 
    }

    .theme-card.apocalypse a {
      color: #FF5722; 
    }
    .theme-card.apocalypse h2 {
      border-left: 6px solid #FF5722;
    }

    .theme-card.apocalypse .challenge-card::before {
      background: #FF5722; 
      color: #fff; 
    }

  </style>
</head>
<body>

  <header>
    <h1>🕵️ CTF : Enquêtes Cyber Sécurité</h1>
    <p class="subtitle">Infiltrez, interceptez, analysez. Montrez que vous êtes le meilleur enquêteur numérique.</p>
  </header>

  <section>
    <h2>🎯 Objectif de la mission</h2>
    <p>
      Bienvenue agent. la réalité numérique est pleine de mystères que seuls les plus aguerris peuvent résoudre. Vous êtes sur le point d'affronter des défis où la frontière entre le bien et le mal se brouille. Chaque dossier que vous ouvrez cache une vulnérabilité que des cybercriminels auraient pu exploiter. Votre mission ? Infiltrer les systèmes, déchiffrer les codes, et découvrir des failles invisibles à l’œil nu. Le temps est compté, les secrets sont enfouis, et vous êtes notre dernier espoir. Serez-vous à la hauteur ?
    </p>

    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-title">Dossier 01 : Authentification JS</div>
        <div class="difficulty">Facile</div>
        <div class="theme">Thème : JavaScript côté client</div>
        <p>La porte d’entrée semble protégée… mais le code révèle ses secrets. Analysez le script et infiltrez-vous.</p>
        <a href="challenge1.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 02 : Obfuscation Encodée</div>
        <div class="difficulty">Moyen</div>
        <div class="theme">Thème : Analyse de chaîne et décodage</div>
        <p>Un mot de passe dissimulé sous des codes percent-encoding. Saurez-vous lire entre les octets ?</p>
        <a href="challenge2.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 03 : Cookies Mystérieux</div>
        <div class="difficulty">Difficile</div>
        <div class="theme">Thème : Contrôle d'accès par cookies</div>
        <p>Un simple cookie peut-il vraiment tout changer ? Explorez les permissions cachées pour découvrir le flag...</p>
        <a href="challenge3.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 04 : Attaque sur JWT - Manipulation des cookies et contrôle d'accès</div>
        <div class="difficulty">Expert</div>
        <div class="theme">Thème : Exploitation de JWT et contrôle d'accès via cookies</div>
        <p>Exploitez un cookie contenant un JWT pour manipuler les privilèges d'accès et obtenir un flag secret en devenant administrateur.</p>
        <a href="challenge4.php">Accéder au dossier →</a>
      </div>

    </div>

    <div class="theme-card apocalypse">
      <h2>💻 Apocalypse Cybernétique</h2>
      <p>Le monde numérique s'effondre sous le poids d'une attaque virale sans précédent. Un virus insidieux se propage, dévastant tout sur son passage, et des informations cruciales disparaissent à chaque instant. Au milieu du chaos, des données essentielles sont dissimulées, cachées dans les recoins sombres du réseau. Vous êtes l'unique rempart contre cette catastrophe mondiale. Plongez dans un tourbillon d'énigmes, analysez des codes corrompus et découvrez des vérités qui pourraient changer l'avenir de la cybersécurité. Êtes-vous prêt à affronter l'apocalypse numérique ?</p>

      <div class="challenge-container">
        <div class="challenge-card">
          <div class="challenge-title">Dossier 01 : Contamination des Fichiers</div>
          <div class="difficulty">Facile</div>
          <p>Un fichier infecté contient des secrets. Explorez les métadonnées et trouvez ce qui se cache dedans.</p>
          <a href="apocalypse1.php">Accéder au dossier →</a>
        </div>

        <div class="challenge-card">
          <div class="challenge-title">Dossier 02 : Message Caché</div>
          <div class="difficulty">Moyen</div>
          <p>Un message codé est caché dans le code source d'un site. Résolvez l'énigme pour obtenir un flag secret.</p>
          <a href="apocalypse2.php">Accéder au dossier →</a>
        </div>

        <div class="challenge-card">
          <div class="challenge-title">Dossier 03 : Trafic de Virus</div>
          <div class="difficulty">Difficile</div>
          <p>Analysez un paquet réseau corrompu pour découvrir des informations cruciales sur le virus qui se propage.</p>
          <a href="apocalypse3.php">Accéder au dossier →</a>
        </div>

        <div class="challenge-card">
          <div class="challenge-title">Dossier 04 : Exploitation de Backdoor</div>
          <div class="difficulty">Expert</div>
          <p>Un backdoor est installé dans le réseau. Utilisez des outils d'exploitation pour pénétrer dans le système et en sortir indemne.</p>
          <a href="apocalypse4.php">Accéder au dossier →</a>
        </div>
      </div>
    </div>

    <!-- Module de validation des flags -->
    <div class="flag-validation">
      <h3>🔑 Validation de Flag</h3>
      <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
        <input type="text" name="flag" class="flag-input" placeholder="Entrez votre flag" required />
        <button type="submit" class="flag-submit">Vérifier le Flag</button>
      </form>

      <div class="validation-result">
        <?php
          if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $flag = $_POST['flag'];

            // Validation des flags
            $flags = [
              'Authentification JS' => 'admin_password123',
              'Obfuscation Encodée' => 'encodage_maîtrisé_007',
              'Cookies Mystérieux' => 'c00kies_unlocked_admin_mode',
              'Attaque sur JWT' => 'jwt_decrypt_code_master',
              'Contamination des Fichiers' => 'infected_file_found',
              'Message Caché' => 'secret_message_decoded',
              'Trafic de Virus' => 'virus_traffic_analyzed',
              'Exploitation de Backdoor' => 'backdoor_exploited'
            ];

            if (in_array($flag, $flags)) {
              echo "<p style='color: green;'>Bravo, vous avez validé le flag du challenge $flag!</p>";
            } else {
              echo "<p style='color: red;'>Ce flag n'est pas valide, essayez encore.</p>";
            }
          }
        ?>
      </div>
    </div>

  </section>

  <footer>
    <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Créé par votre équipe d'enquêteurs numériques</p>
  </footer>

</body>
</html>
