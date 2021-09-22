const mongoose = require('mongoose');
const User = require('../models/User.js');

exports.registerNewUser = async (req, res) => {
    try {
        const newUser = await User.create({
            userName: req.body.userName,
            firstName: req.body.firstName,
            email: req.body.email,
            password: req.body.password,
        });

        const token = newUser.getSignedToken();
    
        res.status(201).json({
            status: 'success',
            token,
            data: newUser,
        })
    } catch (err) {
        res.status(500).json({
            status: 'failed to create user...',
            message: err,
        })
    }
}

exports.login = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            status: 'failed',
            message: 'Please provide an email and a password...',
        })
    }

    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');

        if (!user || !(await user.matchPassword(req.body.password))) {
            return res.status(400).json({
                status: 'failed',
                message: 'Incorrect Email or Password...'
            })
        }

        const token = user.getSignedToken()

        res.status(200).json({
            status: 'success',
            token,
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Failed to find that user...',
        })
    }
}