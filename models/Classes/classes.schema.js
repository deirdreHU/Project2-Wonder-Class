const mongoose = require("mongoose");

const ClassesSchema = new mongoose.Schema({
    Name: String,
    
    TeacherID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    StudentIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },

    Stories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Story',
        default: []
    }
});

module.exports = mongoose.model("Class", ClassesSchema);