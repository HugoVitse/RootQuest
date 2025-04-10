<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CTF Cyber Sécurité – Dossier Apocalypse</title>
  <style>
    /* Style global de la page */
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #1E1E1E;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100vh;
      justify-content: space-between;
    }

    header {
      background-color: #333;
      width: 100%;
      text-align: center;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    h1 {
      color: #FF5722;
      font-size: 3em;
      margin: 0;
      text-transform: uppercase;
    }

    .subtitle {
      color: #BDBDBD;
      font-style: italic;
      font-size: 1.2em;
      margin-top: 5px;
    }

    section {
      width: 100%;
      max-width: 1200px;
      margin-top: 50px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h2 {
      color: #FF5722;
      font-size: 2em;
      margin-bottom: 20px;
      text-transform: uppercase;
      border-bottom: 3px solid #FF5722;
      padding-bottom: 10px;
    }

    .challenge-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
      width: 100%;
      margin-top: 40px;
    }

    .challenge-card {
      background: #2A2A2A;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
      transition: all 0.3s ease;
      text-align: center;
      position: relative;
    }

    .challenge-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
    }

    .challenge-title {
      color: #FF5722;
      font-size: 1.5em;
      margin-bottom: 10px;
    }

    .difficulty {
      font-size: 1em;
      background-color: #FF5722;
      color: #000;
      padding: 5px 15px;
      border-radius: 50px;
      margin-bottom: 10px;
    }

    .theme {
      font-size: 0.95em;
      color: #BDBDBD;
      margin-bottom: 10px;
      font-style: italic;
    }

    a {
      color: #FF5722;
      text-decoration: none;
      font-weight: bold;
      border: 2px solid #FF5722;
      padding: 5px 15px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    a:hover {
      background-color: #FF5722;
      color: #fff;
    }

    /* Validation des flags */
    .flag-validation {
      background-color: #2A2A2A;
      padding: 30px;
      margin-top: 40px;
      width: 100%;
      max-width: 500px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      text-align: center;
    }

    .flag-input {
      padding: 12px;
      font-size: 1.1em;
      width: 100%;
      border: none;
      background-color: #444;
      color: #FF5722;
      margin-bottom: 15px;
      border-radius: 8px;
    }

    .flag-submit {
      padding: 12px 25px;
      background-color: #FF5722;
      color: #fff;
      font-size: 1.1em;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .flag-submit:hover {
      background-color: #D43B00;
    }

    .validation-result {
      margin-top: 20px;
      font-size: 1.2em;
      color: #FFD700;
    }
  </style>
</head>
<body>

  <header>
    <h1>🕶️ CTF : Apocalypse Cybernétique</h1>
    <p class="subtitle">Le virus informatique menace l'humanité. Seuls les meilleurs hackers peuvent sauver le monde.</p>
  </header>

  <section>
    <h2>🎯 Objectif de la mission</h2>
    <p>
      Vous êtes un hacker de la résistance, vous devez découvrir les secrets cachés dans des systèmes corrompus 
      pour empêcher la propagation du virus et sauver les informations vitales.
    </p>

    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-title">Dossier 01 : Contamination des Fichiers</div>
        <div class="difficulty">Facile</div>
        <div class="theme">Thème : Stéganographie</div>
        <p>Un fichier infecté contient des secrets. Analysez les métadonnées et explorez les données cachées.</p>
        <a href="challenge1.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 02 : Message Caché</div>
        <div class="difficulty">Moyen</div>
        <div class="theme">Thème : Cryptographie</div>
        <p>Un message codé se cache dans le code source d'un site web. Découvrez le mot de passe caché.</p>
        <a href="challenge2.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 03 : Trafic de Virus</div>
        <div class="difficulty">Difficile</div>
        <div class="theme">Thème : Analyse Réseau</div>
        <p>Un paquet réseau corrompu contient des informations cruciales. Analysez les paquets et décodez le message.</p>
        <a href="challenge3.php">Accéder au dossier →</a>
      </div>

      <div class="challenge-card">
        <div class="challenge-title">Dossier 04 : Le Code du Virus</div>
        <div class="difficulty">Expert</div>
        <div class="theme">Thème : Reverse Engineering</div>
        <p>Un fichier binaire cachant un virus contient un secret. Analysez le binaire pour découvrir le flag.</p>
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
              'challenge1' => 'flag1_apocalypse_security',
              'challenge2' => 'flag2_encodage_dossier',
              'challenge3' => 'flag3_traffics_de_virus',
              'challenge4' => 'flag4_reverse_engineering_victory'
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
    <p>&copy; 2025 - CTF Apocalypse Cybernétique - Tous droits réservés</p>
  </footer>

</body>
</html>
