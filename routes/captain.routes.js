const express = require('express');
const router = express.Router();
const { body } = require('express-validator')
const captainController = require('../controllers/captain.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min: 3}).withMessage(
    'First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage(
     'password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage(
        'Vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min: 3}).withMessage(
        'Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt().withMessage(
        'capacity should be Number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage(
        'Invalid Vehicle Type')            
],  captainController.registerCaptain
)

router.post('/login',[ 
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min: 6}).withMessage(
        'password must be at least 6 characters long')
], captainController.loginCaptain)

module.exports = router;