<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CTF – Missions Sécurisées</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Share Tech Mono', monospace;
      background: radial-gradient(circle at center, #0e0e0e 0%, #000000 100%);
      color: #e6ffe6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 255, 127, 0.05),
        rgba(0, 255, 127, 0.05) 1px,
        transparent 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 0;
    }

    header {
      background: linear-gradient(to right, #001f1f, #003333);
      padding: 40px 20px;
      text-align: center;
      border-bottom: 2px solid #00ffc3;
      box-shadow: 0 0 20px #00ffc3aa;
      position: relative;
      z-index: 1;
    }

    header h1 {
      font-size: 2.8em;
      color: #00ffc3;
      letter-spacing: 3px;
      margin-bottom: 10px;
      text-shadow: 0 0 5px #00ffc3, 0 0 10px #00ffc3aa;
    }

    header p {
      font-size: 1.1em;
      color: #99ffee;
      max-width: 800px;
      margin: auto;
      line-height: 1.6;
    }

    section {
      padding: 60px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 35px;
      width: 100%;
      max-width: 1000px;
      justify-content: center;
    }

    .challenge-card {
      background: linear-gradient(to top, #0f0f0f, #1b1b1b);
      border: 1px solid #00ffc355;
      border-radius: 16px;
      padding: 30px 25px;
      position: relative;
      transition: transform 0.3s ease, box-shadow 0.4s ease;
      text-align: center;
      box-shadow: 0 0 15px #00ffc333;
    }

    .challenge-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 0 25px #00ffc3;
    }

    .challenge-card h2 {
      font-size: 1.2em;
      color: #00ffc3;
      margin-bottom: 15px;
      text-shadow: 0 0 5px #00ffc3aa;
    }

    .challenge-card h2::before {
      content: "📂 ";
      font-size: 1.2em;
    }

    .challenge-card p {
      font-size: 0.95em;
      color: #cceeff;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .access-btn {
      padding: 10px 25px;
      background-color: #00ffc3;
      color: #000;
      border-radius: 30px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.85em;
      text-decoration: none;
      transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s;
      box-shadow: 0 0 10px #00ffc3aa;
    }

    .access-btn:hover {
      background-color: #00e6b2;
      transform: scale(1.06);
      box-shadow: 0 0 20px #00ffc3;
    }

    footer {
      background-color: #0b0b0b;
      text-align: center;
      padding: 30px 20px;
      border-top: 2px solid #00ffc355;
      color: #99ffee;
      font-size: 0.9em;
      z-index: 1;
    }

    footer a {
      color: #00ffc3;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    .flag-validation {
      background: linear-gradient(to bottom, #111, #222);
      border: 1px solid #00ffc355;
      border-radius: 16px;
      padding: 30px 25px;
      margin-top: 40px;
      width: 100%;
      max-width: 600px;
      text-align: center;
      box-shadow: 0 0 20px #00ffc355;
    }

    .flag-validation h3 {
      font-size: 1.5em;
      color: #00ffc3;
      margin-bottom: 20px;
      text-shadow: 0 0 5px #00ffc3aa;
    }

    .flag-validation input[type="text"] {
      padding: 10px;
      font-size: 1em;
      width: 80%;
      max-width: 350px;
      margin-bottom: 20px;
      border-radius: 8px;
      border: 1px solid #00ffc355;
      background-color: #000;
      color: #00ffc3;
    }

    .flag-validation button {
      padding: 12px 25px;
      background-color: #00ffc3;
      color: #000;
      font-weight: bold;
      text-transform: uppercase;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      font-size: 1em;
      transition: background-color 0.3s, transform 0.3s;
    }

    .flag-validation button:hover {
      background-color: #00e6b2;
      transform: scale(1.05);
    }

    .result {
      margin-top: 20px;
    }

    .result p {
      font-size: 1.1em;
      line-height: 1.6;
    }

    .result .success {
      color: #adff2f;
    }

    .result .error {
      color: #ff4d4d;
    }
  </style>
</head>
<body>

  <header>
    <h1>CTF – Missions Sécurisées</h1>
    <p>
      🌐 Agent, vous entrez dans un monde ravagé. Vos compétences sont notre dernier espoir pour restaurer l'ordre numérique. Choisissez votre mission avec prudence.
    </p>
  </header>

  <section>
    <div class="grid">

      <div class="challenge-card">
        <h2>Dossier 01 – 🟢 [Easy] Contamination d'un Fichier</h2>
        <p>
          Un fichier exfiltré contient une menace. Analysez, identifiez et neutralisez le code malveillant avant qu’il ne se propage.
        </p>
        <a href="challenge1.php" class="access-btn">Accéder au dossier</a>
      </div>

      <div class="challenge-card">
        <h2>Dossier 02 – 🟠 [Medium] Message Caché</h2>
        <p>
          Un signal crypté circule dans le réseau. Décryptez ses secrets avant qu’il ne disparaisse dans l’ombre.
        </p>
        <a href="challenge2.php" class="access-btn">Accéder au dossier</a>
      </div>

      <div class="challenge-card">
        <h2>Dossier 03 – 🟠 [Medium] Trafic de Virus</h2>
        <p>
          Un réseau souterrain propulse des virus via des cookies. Remontez la filière et infiltrez leur protocole.
        </p>
        <a href="challenge3.php" class="access-btn">Accéder au dossier</a>
      </div>

      <div class="challenge-card">
        <h2>Dossier 04 – 🔴 [Hard] Exploitation de Backdoor</h2>
        <p>
          Une porte dérobée a été installée. Pénétrez dans les serveurs ennemis en utilisant leur propre faille contre eux.
        </p>
        <a href="challenge4.php" class="access-btn">Accéder au dossier</a>
      </div>

    </div>
  </section>

  <footer>
    <p>&copy; 2025 – CTF Missions Sécurisées. <a href="#">Accès réservé aux agents classés</a>.</p>
  </footer>

</body>
</html>
