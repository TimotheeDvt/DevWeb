const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Chargement des clés
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, './keys/jwtRS256.key'));
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, './keys/jwtRS256.key.pub'));

function createJWT(userId) {
    return JWT.sign(
        {
            userId: userId,
            refreshTime: Math.floor(Date.now() / 1000) + 2700 // 45mn
        },
        RSA_PRIVATE_KEY,
        {
            algorithm: 'RS256',
            expiresIn: '1h'
        });
}

function decodeSessionCookie(req) {
    if (typeof req.cookies.SESSIONID === 'undefined') {
        return { userId: -1 };
    }
    const sessionid = req.cookies.SESSIONID;
    try {
        const token = JWT.verify(sessionid, RSA_PUBLIC_KEY, { algorithms: ['RS256'] });
        return token;
    } catch (err) {
        return { userId: -1 };
    }
}

function sendSessionCookie(req, res, payload) {
    let jwtToken = '';
    if (payload.userId !== -1 && payload.refreshTime && (Math.floor(Date.now() / 1000) <= payload.refreshTime)) {
        jwtToken = req.cookies.SESSIONID;
    } else {
        jwtToken = createJWT(payload.userId);
    }

    res.cookie('SESSIONID', jwtToken, {
        httpOnly: true,
        secure: false, // false pour le développement (http)
        sameSite: 'Lax'
    });
}

module.exports = { decodeSessionCookie, sendSessionCookie };