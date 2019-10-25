const jwt = require('jsonwebtoken');
const fs = require("fs");
/* Load DAO Common functions */
const daoCommon = require('../dao/commons/daoCommon');



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
            this.common = new daoCommon();
            let sqlRequest = "SELECT is_admin FROM owners WHERE id=$id";
            let sqlParams = { $id: decoded.id };

            this.is_admin = this.common.findOne(sqlRequest, sqlParams).then(row => {
                if (row.is_admin) {
                    next();
                } else {
                    return res.status(401).json({
                        message: "AUTH FAILED"
                    });
                }
            }).catch(err => {
                if (err) {
                    return res.status(401).json({
                        message: "AUTH FAILED"
                    });
                }
            });
        }

    });
}

