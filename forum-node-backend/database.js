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
    const query = "SELECT * FROM user WHERE Username = ? AND PasswordHash = ?";
    const result = await execQuery(query, [login, password]);
    return result;
}

async function getCours(courseId, userId) {
    const query = "SELECT * FROM cours INNER JOIN acces ON acces.IdCours = cours.Id WHERE acces.IdUser = ? AND cours.Id = ?;";
    const result = await execQuery(query, [userId, Number(courseId)]);
    if (!result || result.length === 0)
        return null;
    return result[0];
}

async function getCourses(userId) {
    const query = "SELECT * FROM cours INNER JOIN acces ON acces.IdCours = cours.Id WHERE acces.IdUser = ?;";
    const result = await execQuery(query, [userId]);
    if (!result || result.length === 0)
        return null;
    return result;
}

async function getTopics(courseId, userId) {
    const query = "SELECT topics.Id, topics.Nom, topics.idUser, topics.nbP, topics.lastMsg \
        FROM topics \
        INNER JOIN acces ON acces.IdCours = topics.IdCours \
        WHERE topics.IdCours = ? AND acces.IdUser = ?;";
    const result = await execQuery(query, [Number(courseId), userId]);
    if (!result || result.length === 0)
        return null;
    return result;
}

async function saveNewTopic(topicName, courseId, userId) {
    const query = "SELECT * FROM acces WHERE IdUser = ? AND IdCours = ?;";
    const result = await execQuery(query, [userId, Number(courseId)]);
    if (!result || result.length === 0)
        return null;

    const query2 = "SELECT * FROM topics WHERE Nom = ? AND IdCours = ?;";
    const result2 = await execQuery(query2, [topicName, courseId]);
    if (result2.length > 0)
        return null;

    const query3 = "INSERT INTO topics (Nom, IdCours, idUser, nbP, lastMsg) VALUES (?, ?, ?, 0, NOW());";
    const result3 = await execQuery(query3, [topicName, courseId, userId]);
    if (!result3 || result3.length === 0)
        return null;
    return {
        Id: result3.insertId,
        Nom: topicName,
        idUser: userId,
        nbP: 0,
        lastMsg: new Date().toISOString()
    };
}

module.exports = {
    checkLogin,
    getCours,
    getCourses,
    getTopics,
    saveNewTopic,
};