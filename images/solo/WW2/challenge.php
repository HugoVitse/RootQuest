<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CTF – Opérations Militaires</title>
  <link href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap" rel="stylesheet">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Share Tech Mono', monospace;
      background: linear-gradient(135deg, #2c2c2c, #1a1a1a);
      color: #e0e0e0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background-image: url("war-bg.jpg");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      padding: 40px 20px;
      text-align: center;
      border-bottom: 3px solid #c1ba80;
      box-shadow: 0 0 15px #c1ba8090;
    }

    header h1 {
      font-size: 2.8em;
      color: #c1ba80;
      letter-spacing: 2px;
      text-transform: uppercase;
      text-shadow: 0 0 5px #000;
    }

    header p {
      font-size: 1.1em;
      color: #ccc;
      max-width: 800px;
      margin: auto;
      line-height: 1.6;
      text-align: justify;
    }

    section {
      padding: 60px 40px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;  
      gap: 35px;
      width: 100%;
      max-width: 1000px;
    }

    .mission-card {
      background: linear-gradient(to top, #c1ba80, #c1ba8055);
      border: 1px solid #c1ba8055;
      border-radius: 16px;
      padding: 30px 25px;
      position: relative;
      box-shadow: 0 0 10px #c1ba8033;
      text-align: center;
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .mission-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 0 20px #c1ba80;
    }

    .mission-card h2 {
      font-size: 1.2em;
      color: #000;
      margin-bottom: 15px;
    }

    .mission-card h3 {
      color: #c1ba80;
    }

    .mission-card h2::before {
      content: "🪖 ";
    }

    .mission-card p {
      font-size: 0.95em;
      color: #c1ba8090;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .mission-card .container-defi {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .access-btn {
      padding: 10px 25px;
      background-color: #c1ba80;
      color: #1a1a1a;
      border-radius: 30px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 0.85em;
      text-decoration: none;
      transition: background-color 0.3s, transform 0.3s;
      box-shadow: 0 0 10px #c1ba8090;
    }

    .access-btn:hover {
      background-color: #a99d5f;
      transform: scale(1.05);
    }

    footer {
      background-color: #121212;
      text-align: center;
      padding: 30px 20px;
      border-top: 2px solid #c1ba8055;
      color: #999;
      font-size: 0.9em;
    }

    footer a {
      color: #c1ba80;
      text-decoration: none;
    }

    footer a:hover {
      text-decoration: underline;
    }

    .briefing {
      background: linear-gradient(to bottom, #2e3d2f, #1a1a1a);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 15px #c1ba80;
      max-width: 800px;
      margin: auto;
      display: flex;
      flex-direction: row;
      margin-top : 20px;
      align-items: center;
    }

    .briefing img {
      height: 500px;
      margin-right: 20px;
    }
  </style>
</head>
<body>

  <header>
    <h1>Briefing Général – Opération Firewall Storm</h1>
    <div class="briefing">
    <img src="Soldier.png" alt="soldat" >
    <p>
    Agent, <br/>

  Ton entraînement est terminé. Tu es désormais prêt à être déployé sur le terrain.
  L’ennemi ne dort jamais : il chiffre, il encode, il masque ses traces dans les moindres octets. Ta mission ? Démasquer, décoder et déjouer.<br/><br/>

    Nous avons identifié plusieurs zones d’opération, chacune contenant des anomalies numériques à analyser.
    Les premières missions seront des reconnaissances : observation de code source, détection de messages cachés. Puis viendront les opérations plus risquées : manipulation de tokens, analyse de paquets réseau, contournement de mécanismes de sécurité.
    <br/><br/>
    Chaque mission te demandera de penser comme un espion, d’agir comme un hacker, et de garder la tête froide comme un soldat.
    <br/><br/>
    Prépare-toi, soldat.
    L’ennemi est déjà en place, et il te faudra bien plus qu’un simple navigateur pour le vaincre.
    Chaque mission réussie t’ouvre la voie vers la suivante… mais chaque erreur pourrait être fatale.
    <br/><br/>
    Bonne chance.
    Et que le flag soit avec toi.
    </p>
    </div>
    
  </header>

  <section>
  <div class="grid">

<!-- MISSION 1 -->
<div class="mission-card">
  <h2>🎖️ Opération Enigma – Objectif : Briser le code de l’ennemi</h2>

  
  <div class="container-defi">
    <div class="briefing" style="flex-direction: column; margin:20px">
    <h3>Challenge 01 – "Lettres perdues" 🟢</h3>
    <p>
    Des messages ennemis interceptés sont chiffrés avec un simple César. Retrouve la clé et brise le silence.
    <br><strong>Compétence :</strong> Cryptanalyse basique
  </p>
  <a href="/op_enigma1.php" class="access-btn">Lancer le challenge</a>
    </div>
  
    <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 02 – "Transmission Brouillée" 🟠</h3>
  <p>
    Une image radio contient des secrets bien cachés… Fouille les bits, traque le flag.
    <br><strong>Compétence :</strong> Stéganographie
  </p>
  <a href="/op_enigma2.php" class="access-btn">Lancer le challenge</a>
  </div>
  </div>
  
</div>

<!-- MISSION 2 -->
<div class="mission-card">
  <h2>💣 Front Invisible – Objectif : Repérer les infiltrés dans le système</h2>

  <div class="container-defi">
  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 03 – "L'espion" 🟠</h3>
  <p>
    Un agent double s’est dissimulé dans notre base. Il utilise des caractères étranges pour échapper à nos radars.
    <br><strong>Compétence :</strong> BDD / Unicode / Vision utilisateur
  </p>
  <a href="/op_invisible1.php" class="access-btn">Lancer le challenge</a>
  </div>

  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 04 – "Sabotage silencieux" 🔴</h3>
  <p>
    Une page d’annonce a été compromise. Analyse le code source pour détecter un XSS furtif.
    <br><strong>Compétence :</strong> Sécurité web, XSS
  </p>
  <a href="/op_invisible2.php" class="access-btn">Lancer le challenge</a>
  </div>
  </div>
</div>

<!-- MISSION 3 -->
<div class="mission-card">
  <h2>🔍 Radio Silence – Objectif : Intercepter et décoder les échanges ennemis</h2>
  
  <div class="container-defi">
  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 05 – "Signal Ennemis" 🟠</h3>
  <p>
    Un flag se cache dans une transmission HTTP étrange. Inspecte les paquets réseau et repère l’agent ennemi.
    <br><strong>Compétence :</strong> Réseaux / Wireshark / Headers HTTP
  </p>
  <a href="/op_radio1.php" class="access-btn">Lancer le challenge</a>
  </div>

  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 06 – "Fréquence Interdite" 🔴</h3>
  <p>
    Une page verrouillée refuse l'accès... mais d'autres méthodes HTTP pourraient te livrer ses secrets.
    <br><strong>Compétence :</strong> HTTP / Méthodes alternatives / Contournement
  </p>
  <a href="/op_radio2.php" class="access-btn">Lancer le challenge</a>
  </div>
  </div>
</div>

<!-- MISSION 4 -->
<div class="mission-card">
  <h2>🧨 Opération Valkyrie – Objectif : Renverser le système de l’intérieur</h2>

<div class="container-defi">
  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 07 – "Faux papiers" 🟠</h3>
  <p>
    Les identifiants sont optionnels quand on maîtrise l’injection SQL… Trouve la faille, passe la frontière.
    <br><strong>Compétence :</strong> SQL Injection
  </p>
  <a href="/op_valkyrie1.php" class="access-btn">Lancer le challenge</a>
  </div>

  <div class="briefing" style="flex-direction: column; margin:20px">
  <h3>Challenge 08 – "Réseau Souterrain" 🔴</h3>
  <p>
    Une API dissimule des routes secrètes. Utilise le fuzzing et l’analyse JS pour exposer leurs chemins.
    <br><strong>Compétence :</strong> Fuzzing / Découverte d’API
  </p>
  <a href="/op_valkyrie2.php" class="access-btn">Lancer le challenge</a>
  </div>
  </div>
</div>

</div>

  </section>

  <footer>
    <p>&copy; 2025 – Opérations CTF Militaires. <a href="#">Canal sécurisé des agents</a>.</p>
  </footer>

</body>
</html>
