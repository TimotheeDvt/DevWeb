<?php
require_once 'mysqlConnect.php';

// définition de la requête
$query = "SELECT * FROM $mysqlTable WHERE field1=? AND field2 IN (?,?)";
$data = ['f1', 3, 5];

// préparation et exécution de la requête à la base
$statement = $PDO->prepare($query); // préparation (sans transmettre les données)
$exec = $statement->execute($data); // exécution (en transmettant les données)

// récupération du résultat
$resultats = $statement->fetchAll(PDO::FETCH_ASSOC);

// affichages si besoin
print_r($resultats);

?>