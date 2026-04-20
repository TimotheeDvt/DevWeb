<?php

require_once 'helper.php';

// On utilise l'ID de l'utilisateur stocké en session par auth.php
// C'est beaucoup plus sûr que de le recevoir par $_POST (qu'on peut falsifier).
$userId = $_SESSION['user_id'];
$courseId = $_POST['IdCours'];
$query = "SELECT IdCours, Nom, lastMsg, NbP, NbT FROM cours INNER JOIN acces ON acces.IdCours = cours.Id WHERE acces.IdUser = ? AND cours.Id = ?;";

try {
  $statement = $PDO->prepare($query);
  $statement->execute([$userId, $courseId]);
  $resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

  // On renvoie le tableau directement pour que le @for d'Angular fonctionne
  echo json_encode($resultats);
} catch (Exception $e) {
  sendError("Erreur SQL : " . $e->getMessage());
}

?>