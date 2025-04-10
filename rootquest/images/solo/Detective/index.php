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
      border: 2px solid #FFD700;
      padding: 25px;
      border-radius: 10px;
      text-align: center;
    }

    .flag-input {
      padding: 10px;
      font-size: 1em;
      margin-bottom: 10px;
      border: 1px solid #FFD700;
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
      Bienvenue agent. Vous êtes ici pour résoudre une série d'affaires sensibles liées à la sécurité web. 
      Chaque dossier est un challenge représentant une vulnérabilité réelle. 
      Mettez vos compétences d'enquêteur au service de la cybersécurité.
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
              'challenge1' => 'admin_password123',
              'challenge2' => 'encodage_maîtrisé_007',
              'challenge3' => 'c00kies_unlocked_admin_mode',
              'challenge4' => 'jwt_hacked_admin_access'
            ];

            // Vérifier si le flag est correct
            if (in_array($flag, $flags)) {
              echo "<script>alert('✅ Flag valide ! Félicitations, vous avez résolu ce défi $flag.');</script>";
            } else {
              echo "<script>alert('❌ Flag incorrect. Essayez à nouveau.');</script>";
            }
          }
        ?>
      </div>
    </div>

  </section>

  <footer>
    <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés</p>
  </footer>

</body>
</html>
