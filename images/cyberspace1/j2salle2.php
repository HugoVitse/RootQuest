<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salle 2 - Sam</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <div class="container">
        <h1>Centre de documents confidentiels</h1>
        <p><i>Parfois il ne faut pas chercher très loin...</i></p>
        
        <form method="get">
            <label for="search">Recherche : </label>
            <input type="text" id="search" name="search" placeholder="Rechercher..." />
            <input type="submit" value="Envoyer" />
        </form>

        <?php
        if (isset($_GET['search']) && !empty($_GET['search'])) {
            echo '<div class="result">';
            echo '<p>Résultat de la recherche : <strong>Vous n\'avez pas les permissions requises.</strong></p>';
            echo '</div>';
        }
        ?>

        <!--Note pour moi-même : fL4gSp4cE -->
    </div>
</body>
</html>