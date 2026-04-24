const mysql = require('mysql2');

const db = mysql.createConnection({ // connexion à la BD. Cela produit une
  host     : 'localhost',           // instance qui sera utilisée pour les
  user     : 'root',            // queries.
  password : '',            // A noter que cet objet continuera d'exister
  database : 'forum'             // jusqu'à ce qu'on applique sa méthode end()
});
db.connect(); // réalisation de la connexion à la base de données

function myQuery() {
  // on retourne tout de suite une Promesse, sans attendre la réponse du serveur
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM cours WHERE id <= ?',
      [2],
    (error, results) => {        // quand on a la réponse du serveur Mysql,
      if (error) reject(error);  // on rejette la promesse en cas d'erreur ou
      else resolve(results);     // on la résout si tout est OK
    });
  });
}

// l'argument du then est une fonction exécutée dès que la promesse est résolue,
// autrement dit, dès que l'on a la réponse du serveur Mysql
myQuery().then((results) => { console.log(results); });
db.end();