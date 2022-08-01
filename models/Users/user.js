const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    roles: {
        type: [{
            type: String,
            enum: ['teacher', 'student']
        }],
        default: ['teacher']
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    hash: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User
