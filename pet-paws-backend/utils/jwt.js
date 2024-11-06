const jwt = require('jsonwebtoken');

const ACESS_TOKEN_SECRET = 'vasil_pet_paws_money_best';
const REFRESH_TOKEN_SECRET = 'ava_pet_paws_best';

const generateAccessToken = (user) => {
    return jwt.sign({userId: user._id}, ACESS_TOKEN_SECRET, {expiresIn: '15m'});
}

const generateRefreshToken = (user) => {
    return jwt.sign({userId: user._id}, REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = {generateAccessToken, generateRefreshToken, REFRESH_TOKEN_SECRET}