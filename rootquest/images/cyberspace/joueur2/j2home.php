<!DOCTYPE html>
<html>
<head>
    <title>Salle 2 - Joueur 2</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <h1>🔑 Tentative de connexion SSH</h1>
    <p>Tu as un accès SSH mais il te manque un mot de passe.</p>

    <form method="POST">
        <input type="password" name="ssh_password" placeholder="Mot de passe SSH" required>
        <button type="submit">Connexion</button>
    </form>

    <?php
    if (isset($_POST['ssh_password'])) {
        $password = $_POST['ssh_password'];

        if ($password === "SuperSpace") {
            echo "<h2>✅ Connexion réussie !</h2>";
            echo "<p>Tu accèdes aux <strong>logs des capteurs</strong> du vaisseau...</p>";
            echo "<p>Prochaine étape : Trouver une anomalie.</p>";
            echo "<a href='j2salle2.php'>🔍 Accéder aux logs</a>";
        } else {
            echo "<h2>⛔ Mot de passe incorrect</h2>";
        }
    }
    ?>
</body>
</html>
