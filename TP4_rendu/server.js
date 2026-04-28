const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const sessionJWT = require('./sessionJWT')
const { sendError } = require('./message');
require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(cors({
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware
app.use((req, res, next) => {
    if (req.path === '/connection') {
        return next();
    }
    const session = sessionJWT.decodeSessionCookie(req);
    const userId = session.userId;

    if (userId === -1) {
        return sendError(res, 'Non authentifié', 401);
    }

    // On stocke le userId dans l'objet req pour les routes suivantes
    req.userId = userId;

    sessionJWT.sendSessionCookie(req, res, session);

    next(); // on laisse le router continuer vers la route appelé
});

const routesPath = path.join(__dirname, 'routes');

if (fs.existsSync(routesPath)) {
    fs.readdirSync(routesPath).forEach(file => {
        if (file.endsWith('.js')) {
            const route = require(path.join(routesPath, file));

            try {
                app.use('/', route);
            } catch (e) {
                console.log(`Erreur: Route ${file} non chargée`)
            }
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));