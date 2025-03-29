<?php
// Connexion à la base SQLite
$db = new SQLite3('../database.db');

$error = "";
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // REQUÊTE SQL VULNÉRABLE (pour le CTF)
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $db->query($query);

    if ($result->fetchArray()) {
        // Redirection vers la salle suivante
        header("Location: j1salle2.php");
        exit();
    } else {
        $error = "🚨 Échec de la connexion. Accès refusé.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion au Vaisseau</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container">
        <h1 class="title-glow">🔐 Accès au Vaisseau</h1>
        <p class="intro">Identifiez-vous pour reprendre le contrôle du système.</p>

        <div class="login-box">
            <?php if ($error): ?>
                <p class="error"><?php echo $error; ?></p>
            <?php endif; ?>
            
            <form method="POST">
                <input type="text" name="username" placeholder="👨‍🚀 Nom d'utilisateur" required><br>
                <input type="password" name="password" placeholder="🔑 Mot de passe" required><br>
                <button type="submit" class="btn">🚀 Se connecter</button>
            </form>
        </div>
    </div>
</body>
</html>
