const jwt = require('jsonwebtoken');

const {ACESS_TOKEN_SECRET} = require('../utils/jwt');

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   if(!authHeader){
      console.log(req.headers)
      return res.status(401).json({error: 'No token provided'});
   } 

   const token = authHeader.split(' ')[1];
   if(!token) return res.status(401).json({error: 'Unathorized'});

   jwt.verify(token, ACESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.status(403).json({error: 'Token is invalid or expired'});
    req.userId = decoded.userId;
    next();
   })
}

module.exports = authenticateToken;