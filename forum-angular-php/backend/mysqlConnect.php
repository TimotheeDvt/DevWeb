<?php
require_once '../config.php';

// les propriétés indiquant comment se connecter à la base de données
$dsn = "mysql:host=$mysqlHost;" .
       "dbname=$mysqlDatabase;" .
       "charset=$charset";

// les options
$opt = [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES => false
];

// création de l'instance PDO et connexion à la BD
$PDO = new PDO($dsn, $mysqlLogin, $mysqlPassword, $opt);
?>