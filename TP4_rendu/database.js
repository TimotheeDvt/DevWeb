require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect();

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

async function checkLogin(login, password) {
    if (!login || !password) return null;
    const query = "SELECT * FROM fisa25_lecteur WHERE login = ? AND password = ?";
    const result = await execQuery(query, [login, password]);
    return result;
}

async function getLivres(userId) {
    const query = "SELECT * FROM `fisa25_lecture` WHERE fisa25_lecture.id_lecteur = ?;";
    const result = await execQuery(query, [userId]);
    if (!result || result.length === 0)
        return null;

    const livres = [];
    for (let i = 0; i < result.length; i++) {
        livres.push(await getDetails(result[i].id_livre, userId))
    }
    return livres;
}

async function getDetails(livreId, userId) {
    const queryUserLivre = "SELECT id_livre FROM `fisa25_lecture` WHERE fisa25_lecture.id_lecteur = ?;";
    const userLivres = await execQuery(queryUserLivre, [userId]);
    if(userLivres.filter((l) => l.id_livre == livreId).length == 0)
        return null;

    const query = "SELECT * FROM `fisa25_livre` WHERE id_livre = ?;";
    const result = await execQuery(query, [livreId]);
    if (!result || result.length === 0)
        return null;

    return result[0];
}

module.exports = {
    checkLogin,
    getLivres,
    getDetails
};