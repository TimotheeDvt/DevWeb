const express = require('express');
const router = express.Router();
const db = require('../database');
const { sendMessage, sendError } = require('../message');
const sessionJWT = require('../sessionJWT');

router.get('/getLivres', async (req, res) => {
    const userId = req.userId;

    try {
        const result = await db.getLivres(userId);
        sendMessage(res, result);
    } catch (err) {
        sendError(res, err.message);
    }
});

module.exports = router;