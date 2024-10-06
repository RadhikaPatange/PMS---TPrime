const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'Radhika@123';

const authMiddleware = (req,res,next) =>{
    const authorization  = req.headers.authorization;
    if(!authorization)
        return res.status(400).json({error:'Token not found in headers'})
    const token = req.headers.authorization.split(" ")[1];

    if(!token) 
        return res.status(400).json({error:'Token not found in headers'})

    try {
        const decoded = jwt.verify(token,SECRET_KEY,{expiresIn:"5m"})
        req.userInfo = decoded
        next()

    } catch (error) {
        res.status(401).json({error:'Internal server error'});
    }
}

const generateToken = (userData) => {
    if(!userData || typeof userData !== 'object'){
        throw new Error('Payload must be an object');
    }
    return jwt.sign(userData,SECRET_KEY,{expiresIn:"5m"})
}
module.exports = {authMiddleware,generateToken};