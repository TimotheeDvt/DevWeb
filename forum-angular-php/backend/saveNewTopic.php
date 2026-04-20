<?php
require_once 'helper.php';

// 1. Vérification des données transmises
if (empty($_POST['Nom']) || empty($_POST['IdCours'])) {
    sendError("Le nom du sujet et l'identifiant du cours sont obligatoires.");
    exit();
}

$nomSujet = trim($_POST['Nom']);
$idCours = $_POST['IdCours'];
$userId = $_SESSION['user_id']; // ID de l'utilisateur connecté

try {
    // 2. Vérification des droits d'accès
    $checkAccess = $PDO->prepare("SELECT * FROM acces WHERE IdUser = ? AND IdCours = ?");
    $checkAccess->execute([$userId, $idCours]);
    if ($checkAccess->rowCount() === 0) {
        sendError("Vous n'avez pas l'autorisation de poster dans ce cours.");
        exit();
    }

    // 3. Vérification des doublons (même nom dans le même cours)
    $checkDuplicate = $PDO->prepare("SELECT * FROM topics WHERE Nom = ? AND IdCours = ?");
    $checkDuplicate->execute([$nomSujet, $idCours]);
    if ($checkDuplicate->rowCount() > 0) {
        sendError("Un sujet avec ce nom existe déjà dans ce cours.");
        exit();
    }

    // 4. Insertion du nouveau sujet
    // On initialise nbP (nombre de posts) à 0 et lastMsg à l'heure actuelle
    $now = date('Y-m-d H:i:s');
    $insert = $PDO->prepare("INSERT INTO topics (Nom, IdCours, IdUser, nbP, lastMsg) VALUES (?, ?, ?, 0, ?)");
    $insert->execute([$nomSujet, $idCours, $userId, $now]);
    
    $newId = $PDO->lastInsertId();

    // 5. Succès : on renvoie l'objet avec les noms de colonnes exacts pour Angular
    echo json_encode([
        "status" => "success",
        "data" => [
            "Id" => $newId,
            "Nom" => $nomSujet,
            "IdCours" => $idCours,
            "IdUser" => $userId,
            "nbP" => 0,
            "lastMsg" => $now
        ]
    ]);

} catch (Exception $e) {
    sendError("Erreur lors de la création : " . $e->getMessage());
}
?>