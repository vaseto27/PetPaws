const jwt = require('jsonwebtoken');

const {ACESS_TOKEN_SECRET} = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token) return res.sendStatus(401);

    jwt.verify(toke, ACESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;