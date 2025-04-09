<?php
if (isset($_POST['ssh_password'])) {
    $password = $_POST['ssh_password'];
    $isCorrect = ($password === "SuperSpace");
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salle 2 - Sam</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container">
        <h1 class="title-glow">🔑 Tentative d'accès aux documents confidentiels</h1>
        <p class="intro">Tu as un accès, mais il te manque un mot de passe. Essaye de le deviner ou de le récupérer...</p>

        <div class="login-box">
            <form method="POST">
                <input type="password" name="ssh_password" placeholder="Mot de passe SSH" required>
                <button type="submit">Connexion</button>
            </form>
        </div>

        <?php if (isset($isCorrect)): ?>
            <div class="message-box <?= $isCorrect ? 'success' : 'error' ?>">
                <?php if ($isCorrect): ?>
                    <h2>✅ Connexion réussie !</h2>
                    <p>Tu accèdes aux <strong>documents confidentiels</strong> du vaisseau...</p>
                    <p>Prochaine étape : Trouver une anomalie.</p>
                    <a href="j2salle2.php" class="btn">🔍 Accéder aux documents</a>
                <?php else: ?>
                    <h2>⛔ Mot de passe incorrect</h2>
                    <p>Réessaie avec un autre mot de passe.</p>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
