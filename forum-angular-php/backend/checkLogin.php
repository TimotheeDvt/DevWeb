<?php
// checkLogin.php
require_once 'helper.php'; // helper inclut déjà auth.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (authenticate()) {
        sendMessage("Success");
    } else {
        sendError("Erreur d'authentification");
    }
} else {
    sendError("Méthode non autorisée");
}
?>