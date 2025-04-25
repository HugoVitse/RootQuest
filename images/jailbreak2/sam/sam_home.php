<?php
// Définir le flag correct
$correct_flag = "Pr15n_Br4KkKK";
$flag_message = "";  // Message pour afficher si le flag est correct ou incorrect

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $entered_flag = $_POST['flag'];
    if ($entered_flag === $correct_flag) {
        $flag_message = "<div class='success'>Félicitations ! Vous avez ouvert la cellule avec succès. Vous êtes libre ! 🎉</div>";
    } else {
        $flag_message = "<div class='error'>Désolé, le flag est incorrect. Essayez encore ! ⚠️</div>";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Sam</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container" id="sam">
        <h1>Cellule 13-B</h1>
        <p class="intro">
            Ici Sam. Je suis enfermé. J'ai réussi à me procurer un vieil ordinateur...
            Peut-être un accès vers l'extérieur ?
        </p>

        <div class="terminal">
            <h3>Entrez le <span class="highlight">flag</span> pour ouvrir la cellule :</h3>
            
            <!-- Formulaire pour entrer le flag -->
            <form method="post" action="">
                <input type="text" name="flag" placeholder="Entrez le flag ici" required />
                <button type="submit">Soumettre</button>
            </form>
            
            <!-- Affichage du message de succès ou d'erreur -->
            <?php echo $flag_message; ?>
        </div>

        <div class="hint">
            <p>Indication : Votre collègue pourrait vous aiguiller au bon endroit.</p>
        </div>
    </div>
</body>
</html>
