<?php
// Init du cookie si absent
if (!isset($_COOKIE['gardien'])) {
    setcookie("gardien", "false", time() + 3600, "/");
}

$isAdmin = isset($_COOKIE['gardien']) && $_COOKIE['gardien'] === 'true';
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Poste de Surveillance - Gardien Alex</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container">
        <h1>📡 Poste de Sécurité - Accès Restreint</h1>
        <p class="intro">Bienvenue Gardien. L'accès au dashboard est strictement réservé au personnel autorisé.</p>

        <?php if ($isAdmin): ?>
            <div class="success">
                <h2>Accès administrateur réussi</h2>
                <a href="alex_s1.php" class="btn">🔍 Accéder aux à votre dashboard</a>
            </div>
        <?php else: ?>
            <div class="hint">
                <p>💡 Vous n'avez pas les autorisations nécessaires.</p>
                <p>Il paraît qu'enfiler la casquette du gardien vous aiderait...</p>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
