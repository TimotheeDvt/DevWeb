<?php
require_once 'helper.php';

// 1. On vérifie si l'ID du cours est bien envoyé par Angular
if (!isset($_POST['IdCours'])) {
    sendError("ID du cours manquant");
    exit();
}

$idCours = $_POST['IdCours'];
$userId = $_SESSION['user_id']; // Pour vérifier que l'utilisateur a le droit d'accès

// 2. Requête corrigée :
// - On précise "topics.IdCours" pour lever l'ambiguïté.
// - On filtre par l'ID du cours reçu d'Angular.
// - On s'assure via la jointure "acces" que l'utilisateur a le droit de voir ce cours.
$query = "SELECT topics.Id, topics.Nom, topics.idUser, topics.nbP, topics.lastMsg
          FROM topics
          INNER JOIN acces ON acces.IdCours = topics.IdCours
          WHERE topics.IdCours = ? AND acces.IdUser = ?";

try {
    $statement = $PDO->prepare($query);
    // On passe l'ID du cours ET l'ID de l'utilisateur
    $statement->execute([$idCours, $userId]);
    $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultats);
} catch (Exception $e) {
    sendError("Erreur SQL : " . $e->getMessage());
}
?>