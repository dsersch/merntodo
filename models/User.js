const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [ true, 'A user name is required...' ],
    },
    firstName: {
        type: String,
        required: [ true, 'A first name is required...'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please enter a valid email...'
        ],
    },
    password: {
        type: String,
        required: [ true, 'A password is required...' ],
        minlength: 6,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt =  await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES })
}

const User = mongoose.model('User', userSchema);
module.exports = User;