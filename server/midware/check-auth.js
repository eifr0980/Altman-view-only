const jwt = require('jsonwebtoken');
const fs = require("fs");

module.exports = (req, res, next) => {
    var auth = req.headers.authorization;

    if (!auth)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

    const key = fs.readFileSync("./server/keys/public.key");
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, key, { algorithm: 'RS256' }, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "AUTH FAILED"
            });
        }

        if (decoded) {
            req.userData = decoded;
            next();
        }
    });


};