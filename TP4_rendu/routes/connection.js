const express = require('express');
const router = express.Router();
const db = require('../database');
const { sendMessage, sendError } = require('../message');
const sessionJWT = require('../sessionJWT');

router.post('/connection', async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await db.checkLogin(login, password);

        if (result && result.length > 0) {
            const user = result[0];
            sessionJWT.sendSessionCookie(req, res, { userId: user.id_lecteur });
            sendMessage(res, { userId: user.id_lecteur, login: user.login });
        } else {
            sendError(res, "Utilisateur non trouvé ou mot de passe incorrect", 400);
        }
    } catch (err) {
        sendError(res, err.message);
    }
});

module.exports = router;