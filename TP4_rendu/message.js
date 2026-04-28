function sendMessage(res, data, code = 200) {
    if (code) res.status(code).json({ status: 'ok', data: data });
    else res.json({ status: 'ok', data: data });
}

function sendError(res, reason, code = 500) {
    if (code) res.status(code).json({ status: 'error', data: {reason: reason }});
    else res.json({ status: 'error', data: {reason: reason }});
}

module.exports = {
    sendMessage,
    sendError
};