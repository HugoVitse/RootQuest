<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Dossier 03 – Cookies Mystérieux</title>
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
      font-size: 2.3em;
      margin: 0;
      color: #FFD700;
      letter-spacing: 1px;
    }

    .subtitle {
      font-style: italic;
      color: #ccc;
      margin-top: 10px;
    }

    section {
      padding: 50px 20px;
      max-width: 600px;
      margin: auto;
    }

    h2 {
      font-size: 1.8em;
      border-left: 6px solid #FFD700;
      padding-left: 15px;
      margin-bottom: 20px;
    }

    .hint {
      background-color: #1b1b1b;
      padding: 25px;
      border: 2px dashed #FFD700;
      border-radius: 10px;
      margin-bottom: 20px;
    }

    .flag {
      background-color: #2c2c2c;
      border-left: 4px solid limegreen;
      padding: 15px;
      font-weight: bold;
      margin-top: 30px;
    }

    footer {
      text-align: center;
      padding: 20px;
      background-color: #111;
      color: #888;
      border-top: 2px solid #FFD700;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <header>
    <h1>🧁 Dossier 03 : Cookies Mystérieux</h1>
    <p class="subtitle">Challenge difficile – Un simple cookie... vraiment ?</p>
  </header>

  <section>
    <h2>🔍 Cookie d'accès</h2>
    <p>
      Cette fois, aucun formulaire, aucune interface visible. Mais l'accès reste restreint.
      Les cookies peuvent révéler bien plus que vous ne le pensez...
    </p>

    <div class="hint">
      <p>
        💡 Astuce : Certains cookies sont bien plus puissants que d'autres... Peut-être qu'en changeant un petit mot, tout devient possible ?
      </p>
    </div>

    <?php
      // Si le cookie 'admin' n'existe pas, on le crée avec une valeur par défaut
      if (!isset($_COOKIE['admin'])) {
        setcookie("admin", "false", time() + 3600, "/");
      }

      // Vérification si l'utilisateur est admin
      $isAdmin = isset($_COOKIE['admin']) && $_COOKIE['admin'] === 'true';

      if ($isAdmin) {
        echo "<div class='flag'>🎉 Flag : FLAG{c00kies_unlocked_admin_mode}</div>";
      } else {
        echo "<script type='text/javascript'>";
        echo "console.log('%c🔐 Accès restreint - Seuls les admins peuvent voir le flag', 'color: gold; font-weight: bold;');";
        echo "</script>";
      }
    ?>


    <p style="margin-top: 30px;">🔁 Vous pouvez rafraîchir la page une fois les bons cookies en place.</p>
  </section>

  <footer>
    <p>&copy; 2025 - CTF Enquête & Sécurité - Tous droits réservés</p>
  </footer>
</body>
</html>
