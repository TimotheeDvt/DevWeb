const express = require('express');
const cors = require('cors');
const session = require('express-session');
const db = require('./database');
const { sendMessage, sendError } = require('./message');
const cookieParser = require('cookie-parser');
const sessionJWT = require('./sessionJWT');
require('dotenv').config();

const app = express();
app.use(cookieParser());

// --- CONFIGURATION HELPER ---
app.use(cors({
    // origin: (origin, callback) => callback(null, true),
    origin: 'http://127.0.0.1:8100',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MIDDLEWARE D'AUTHENTIFICATION ---
const isAuthenticated = (req, res, next) => {
    return next();
};

app.use(isAuthenticated);

// --- ROUTES ---
app.post('/checkLogin', async (req, res) => {
    const { login, password } = req.body;
    try {
        const result = await db.checkLogin(login, password);

        if (result && result.length > 0) {
            const user = result[0];

            sessionJWT.sendSessionCookie(req, res, { userId: user.Id });

            sendMessage(res, { userId: user.Id, username: user.Username });
        } else {
            sendError(res, "Utilisateur non trouvé ou mot de passe incorrect", 400);
        }
    } catch (err) {
        sendError(res, err.message);
    }
});

app.post('/getCourses', async (req, res) => {
    const session = sessionJWT.decodeSessionCookie(req);
    const userId = session.userId;

    if (userId === -1) {
        return sendError(res, 'Non authentifié', 401);
    }

    sessionJWT.sendSessionCookie(req, res, session);

    try {
        const result = await db.getCourses(userId);
        sendMessage(res, result);
    } catch (err) {
        sendError(res, err.message);
    }
});

app.post('/cours/:courseId', async (req, res) => {
    const session = sessionJWT.decodeSessionCookie(req);
    const userId = session.userId;

    if (userId === -1) {
        return sendError(res, 'Non authentifié', 401);
    }

    sessionJWT.sendSessionCookie(req, res, session);

    const courseId = req.params.courseId;
    try {
        const result = await db.getCours(courseId, userId);
        sendMessage(res, result);
    } catch (err) {
        sendError(res, err.message);
    }
})

app.post('/getTopics', async (req, res) => {
    const session = sessionJWT.decodeSessionCookie(req);
    const userId = session.userId;

    if (userId === -1) {
        return sendError(res, 'Non authentifié', 401);
    }

    sessionJWT.sendSessionCookie(req, res, session);

    const { courseId } = req.body;
    try {
        const result = await db.getTopics(courseId, userId);
        sendMessage(res, result);
    } catch (err) {
        sendError(res, err.message);
    }
});

app.post('/saveNewTopic', async (req, res) => {
        const session = sessionJWT.decodeSessionCookie(req);
    const userId = session.userId;

    if (userId === -1) {
        return sendError(res, 'Non authentifié', 401);
    }

    sessionJWT.sendSessionCookie(req, res, session);

    const { Nom, courseId } = req.body;
    try {
        const result = await db.saveNewTopic(Nom, courseId, userId);
        sendMessage(res, result);
    } catch (err) {
        sendError(res, err.message);
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));