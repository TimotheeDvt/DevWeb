const express = require('express');
const router = express.Router();
const db = require('../database');
const { sendMessage, sendError } = require('../message');
const sessionJWT = require('../sessionJWT');

router.get('/getDetails/:idLivre', async (req, res) => {
    const userId = req.userId;

    const idLivre = req.params.idLivre;

    try {
        const result = await db.getDetails(idLivre, userId);

        if (result) {
            sendMessage(res, result);
        } else {
            sendError(res, "Livre non trouvé ou non accessible", 404);
        }
    } catch (err) {
        sendError(res, err.message);
    }
});

module.exports = router;