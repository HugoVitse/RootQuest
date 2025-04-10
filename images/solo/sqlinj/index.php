<?php
$db = new SQLite3('database.db'); 

$flag = "Fl4g_87687"; 
$error = "";
$successMessage = "";

if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $db->query($query);

    if ($result->fetchArray()) {
        $successMessage = "🎉 Connexion réussie ! Voici votre flag : <strong>$flag</strong>";
    } else {
        $error = "Échec de la connexion. Accès refusé.";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Connexion</h1>
        <p>Veuillez entrer vos identifiants pour accéder à votre compte.</p>

        <div class="login-box">
            <?php if ($error): ?>
                <p class="error"><?php echo $error; ?></p>
            <?php endif; ?>

            <?php if ($successMessage): ?>
                <p class="success"><?php echo $successMessage; ?></p>
            <?php endif; ?>
            
            <form method="POST">
                <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
                <input type="password" name="password" placeholder="Mot de passe" required><br>
                <button type="submit" class="btn">Se connecter</button>
            </form>
        </div>
    </div>
</body>
</html>
