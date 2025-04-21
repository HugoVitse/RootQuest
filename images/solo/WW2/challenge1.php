<?php
$flag = null;
$error = false;

$expected = "the quick brown fox jumps over the lazy dog"; // version déchiffrée attendue (tout en minuscules, sans ponctuation)

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_input = strtolower(trim($_POST['decrypted'] ?? ''));

    // nettoyage rapide
    $user_input = preg_replace('/[^a-z ]/', '', $user_input);

    if ($user_input === $expected) {
        $flag = 'FLAG{cesar_broken_successfully}';
    } else {
        $error = true;
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Challenge 01 – Lettres perdues</title>
</head>
<body style="font-family: monospace; background: #1a1a1a; color: white; padding: 40px;">

  <h1>Challenge 01 – Lettres perdues</h1>
  <p><i>Un message intercepté a été chiffré. Télécharge-le et brise son code.</i></p>

  <p>📄 <a href="message1.txt" download style="color: #FFD700;">Télécharger le message</a></p>

  <form method="POST">
    <label for="decrypted">🔓 Message déchiffré :</label><br><br>
    <textarea name="decrypted" rows="4" cols="60" required></textarea><br><br>
    <button type="submit">Soumettre</button>
  </form>

  <?php if ($error): ?>
    <p style="color: red;">❌ Mauvaise réponse. Réessaie !</p>
  <?php endif; ?>

  <?php if ($flag): ?>
    <p style="color: lime;">🎉 Bravo, voici ton flag : <strong><?= htmlspecialchars($flag) ?></strong></p>
  <?php endif; ?>
</body>
</html>
