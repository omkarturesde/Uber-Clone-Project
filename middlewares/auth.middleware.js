const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token){
        return res.status(403).json({message: 'Unauthorized user'});
    }

    const BlackListed = await blacklistTokenModel.findOne({ token: token });

    if(BlackListed){
        return res.status(403).json({message: 'Unauthorized user'});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    }catch (err){
        return res.status(403).json({message: 'Unauthorized user'})
    }
}

module.exports.authCaptain = async (req,res,next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token) {
        return res.status(403).json({message : "Unauthorized captain user"})
    }
    const isBlacklist = await blacklistTokenModel.findOne({ token: token });

    if(isBlacklist){
        return res.status(403).json({message: 'Unauthorized captain user'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const captain = await captainModel.findById(decoded._id)

        req.captain = captain;
        return next();
    }
    catch{
        return res.status(403).json({message: "Unauthorized user"})
    }
}