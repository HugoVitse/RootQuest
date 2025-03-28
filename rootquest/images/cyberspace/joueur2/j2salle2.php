<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Salle 2 - Joueur 2</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container">
        <h1>Centre de documents confidentiels</h1>
        <p>Parfois il ne faut pas chercher très loin...</p>
        
        <form method="get">
            <label for="search">Recherche : </label>
            <input type="text" id="search" name="search" placeholder="Rechercher..." />
            <input type="submit" value="Rechercher" />
        </form>

        <div class="result">
                <p>Résultat de la recherche : <strong><?php echo "Vous n'avez pas les permissions requises."; ?></strong></p>
        </div>

            <!--Félicitations ! Voici votre flag : fL4gSp4cE -->

    </div>
</body>
</html>
