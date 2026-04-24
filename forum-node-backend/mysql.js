const mysql = require('mysql2');

const db = mysql.createConnection({  // connexion à la BD. Cela produit une
  host     : 'localhost',            // instance qui sera utilisée pour les
  user     : 'polytech',             // queries.
  password : 'polytech',             // A noter que cet objet continuera d'exister
  database : 'polytech'              // jusqu'à ce qu'on applique sa méthode end()
});
db.connect(); // réalisation de la connexion à la base de données


function execQuery(sql, params = [], callback = null) {
    return new Promise((resolve, reject) => {
        db.query(
            sql,
            params,
            (error, results) => {
                if (callback) callback(error, results);
                if (error) reject(error);
                else resolve(results);
            }
        );
    });
}

async function getCourses(courseId) {
    const query = "SELECT * FROM courses WHERE id = ?";
    const result = await execQuery(query, [courseId]);
    if (!result || result.length === 0)
        return null;
    return result[0];
}

db.end();  // afin de terminer le programme, il faut arrêter l'attente de l'objet db

module.exports = {
    getCourses
};