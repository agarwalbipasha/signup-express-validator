const express = require('express');
const router = express.Router();
const Data = require('../models/model');
const { body, validationResult } = require("express-validator");

router.get('/', (req, res) => {
    res.status(200).send('All IDs');
});

router.post('/signup', [
    body('fname')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1 })
    .withMessage('Enter a valid first name'), 
    body('lname')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 1 })
    .withMessage('Enter a valid last name'), 
    body('email')
    .trim()
    .not()
    .isEmpty()
    .isEmail()
    .withMessage('Enter a valid email ID'), 
    body('password')
    .trim()
    .isLength({ min: 8 })
    .withMessage('Password should be atleast 8 characters long'), 
    body("confirm")
    .trim()
    .custom((value, {req}) => {
        if(value != req.body.password) {
            return Promise.reject("Password mismatch");
        } return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const data = new Data({ 
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const dataToSave = await data.save();
        res.send(dataToSave);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;


    