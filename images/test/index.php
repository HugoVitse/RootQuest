<?php
// Connexion à la base SQLite
$db = new SQLite3('database.db');

// Vérifier si un login est soumis
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // REQUÊTE SQL VULNÉRABLE 🚨
    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $db->query($query);

    if ($result->fetchArray()) {
        echo "<h2>Bravo ! Voici ton flag :</h2>";
        echo "<pre>" . file_get_contents("flag.txt") . "</pre>";
    } else {
        echo "<h2>Échec de la connexion</h2>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Connexion CTF</title>
</head>
<body>
    <h1>Connexion</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
        <input type="password" name="password" placeholder="Mot de passe" required><br>
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>
