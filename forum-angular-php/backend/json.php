json.php
<?php
// avec ce header on indique que nos affichages sont au format json
header('Content-type:application/json;charset=utf8');

// on utilise la fonction json_encode pour transformer des objets PHP en JSON
echo json_encode([
    'cle1' => 'xxx',
    'cle2' => 'yyy'
]);
