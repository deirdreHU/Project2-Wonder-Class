const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
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

    password: {
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

module.exports = mongoose.model('User', UsersSchema);