const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');

module.exports.registerCaptain = async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    const {fullname , email ,password, vehicle } = req.body;

    //console.log({fullname , email ,password, vehicle });
    
    const isCaptainAlreadyExists = await captainModel.findOne({ email });

    if(isCaptainAlreadyExists){
        return res.status(400).json({message: 'Captain already exists'})
    }

    const hashedPassword = await captainModel.hashPassword(password)


    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    }
    )

    const token = captain.generateAuthToken();

    res.status(200).json({ token ,captain });
}

module.exports.loginCaptain = async (req,res,next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email , password} = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain){
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message: 'invalid email or password'})
    }

    const token = captain.generateAuthToken();

    res.cookie(token);
    res.status(200).json({token , captain})
}