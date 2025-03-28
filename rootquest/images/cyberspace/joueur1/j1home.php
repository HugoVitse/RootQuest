<?php
// Connexion à la base SQLite
$db = new SQLite3('../database.db');

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
        echo "<h2>Échec de la connexion</h2>";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Connexion au Vaisseau</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <h1>Formulaire de Connexion au Vaisseau</h1>
    <form method="POST">
        <input type="text" name="username" placeholder="Nom d'utilisateur" required><br>
        <input type="password" name="password" placeholder="Mot de passe" required><br>
        <button type="submit">Se connecter</button>
    </form>
</body>
</html>
