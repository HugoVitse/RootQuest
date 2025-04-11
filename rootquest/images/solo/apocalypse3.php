<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Dossier 03 : Trafic de Virus - Apocalypse Cybernétique</title>
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

  </style>
</head>
<body>

  <header>
    <h1>🕵️ Dossier 03 : Trafic de Virus</h1>
    <p class="subtitle">Analysez un paquet réseau corrompu pour découvrir des informations cruciales sur le virus qui se propage.</p>
  </header>

  <section>
    <h2>🎯 Objectif de la mission</h2>
    <p>
      Le virus se propage rapidement à travers le réseau, infectant chaque appareil sur son passage. Un paquet réseau a été intercepté, mais il est corrompu. Vous devez analyser ce paquet corrompu pour découvrir des informations essentielles sur le virus et ses objectifs.
      Utilisez des outils d'analyse réseau comme Wireshark ou tcpdump pour analyser le trafic et résoudre ce mystère.
    </p>

    <div class="challenge-container">
      <div class="challenge-card">
        <div class="challenge-title">Dossier 03 : Trafic de Virus</div>
        <div class="difficulty">Difficile</div>
        <div class="theme">Thème : Analyse de paquet réseau corrompu</div>
        <p>Un paquet réseau corrompu contient des informations cruciales. Utilisez vos compétences en analyse de réseau pour découvrir le flag caché dans ce paquet.</p>
        <a href="challenge3_packet.pcap" download="challenge3_packet.pcap">Télécharger le paquet réseau →</a>
      </div>
    </div>
  </section>

  <footer>
    <p>&copy; 2025 CTF Challenge - Tous droits réservés. | Créé par votre équipe d'enquêteurs numériques</p>
  </footer>

</body>
</html>
