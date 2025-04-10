<?php
$flag = "fL4G_Xs5";  // Le flag

$showFlag = false;

// On ne montre le flag QUE si c’est une soumission POST avec un <script>
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'])) {
    $username = $_POST['username'];

    // Vérifie si la payload XSS est présente
    if (strpos($username, "<script>") !== false) {
        $showFlag = true;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Challenge XSS</title>
</head>
<body>
    <div class="container">
        <h1>Challenge XSS</h1>
        <p>Soumettez votre nom d'utilisateur pour démarrer le challenge.</p>

        <form method="POST">
            <input type="text" name="username" placeholder="Entrez votre nom" required><br>
            <button type="submit">Soumettre</button>
        </form>

        <?php if ($showFlag): ?>
            <p style="color: green;">🎉 Bravo ! Vous avez réussi à exploiter la faille XSS.</p>
            <p><strong>Flag :</strong> <?php echo $flag; ?></p>
        <?php endif; ?>

        <p>Astuce : Essayez d'injecter un script JavaScript pour afficher le flag.</p>
    </div>
</body>
</html>
