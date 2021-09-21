const mongoose = require('mongoose');
const User = require('../models/User.js');

exports.registerNewUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
    
        res.status(201).json({
            status: 'success',
            token: '1234',
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
        res.status(400).json({
            status: 'failed',
            message: 'Please provide an email and a password...',
        })
    }

    try {
        const user = await User.findOne({ email: req.body.email }).select('+password');

        const passwordsMatch =  await user.matchPassword(req.body.password)

        if (!passwordsMatch) {
            res.status(400).json({
                status: 'failed',
                message: 'failed to match password...'
            })
        }
        res.status(200).json({
            status: 'success',
            token: '123456'
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: 'Failed to find that user...',
        })
    }
}