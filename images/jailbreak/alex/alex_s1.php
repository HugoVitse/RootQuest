<?php
// Sécurité : s'assurer que seul un "admin" (gardien) a accès à cette page
if (!isset($_COOKIE['admin']) || $_COOKIE['admin'] !== 'true') {
    header("Location: alex_home.php");
    exit();
}

// Vérification du flag pour désactiver la sécurité
if (isset($_POST['flag']) && $_POST['flag'] === 'Pr15n_Br4KkKK') {
    // Code pour désactiver la sécurité, tu peux ajouter ici des actions comme désactiver les alertes, etc.
    echo "<p class='success'>Système de sécurité désactivé avec succès !</p>";
} elseif (isset($_POST['flag'])) {
    echo "<p class='error'>Flag incorrect. Essayez à nouveau.</p>";
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Dashboard Gardien Alex</title>
    <link rel="stylesheet" href="../style/style.css">
</head>
<body>
    <div class="container">
        <h1>🔒 Tableau de Contrôle - Poste d'Alex</h1>
        <p class="intro">Bienvenue sur le terminal de supervision. Vous pouvez consulter les logs récents et les fichiers système.</p>

        <div class="logs">
            <h2>📋 Logs du Système</h2>
            <pre>
                [07:32:12] 🔐 Ouverture cellule 04 refusée.
                [07:33:01] 🧍 Mvt suspect détecté aile nord.
                [07:34:45] ✅ Connexion réussie - utilisateur: gardien_admin
                [07:36:22] 📁 Ouverture fichier : /files/hint.txt
                [07:37:10] 🚨 Verrouillage de la cellule de Sam.
            </pre>
        </div>

        <div class="files">
            <h2>🗂 Fichiers disponibles</h2>
            <ul>
                <li><span class="fake-link">manual_guard.pdf</span></li>
                <li><span class="fake-link">daily_report.txt</span></li>
                <li><span class="fake-link">hint.txt</span> <small class="highlight">(accès récent)</small></li>
            </ul>
        </div>

        <!-- Formulaire pour désactiver la sécurité -->
        <div class="security-control">
            <h2>🛡 Désactivation du Système de Sécurité</h2>
            <form action="" method="POST">
                <label for="flag">Entrez le flag pour désactiver la sécurité :</label>
                <input type="text" id="flag" name="flag" required>
                <button type="submit">Désactiver</button>
            </form>
        </div>

    </div>
</body>
</html>
