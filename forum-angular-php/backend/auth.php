<?php

session_start(['cookie_samesite' => 'Lax']);

require_once 'mysqlConnect.php';

function authenticate() {
    global $PDO;
    if (isset($_POST['login']) && isset($_POST['password'])) {
        // Correction : Sélectionner PasswordHash pour correspondre à la table
        $query = "SELECT Id, PasswordHash FROM User WHERE Username=?";

        $statement = $PDO->prepare($query);
        $statement->execute([$_POST['login']]);

        // Correction : fetch() au lieu de fetchAll() pour avoir une seule ligne
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        if ($user && $_POST['password'] == $user['PasswordHash']) {
            $_SESSION['user_id'] = $user['Id'];
            $_SESSION['user_login'] = $_POST['login'];
            $_SESSION['logged_in_at'] = time();
            return true;
        }
    }
    return false;
}

function isAuthenticated() {
    return isset($_SESSION['user_id']);
}