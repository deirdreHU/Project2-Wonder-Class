const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
    title: String,
    
    classID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },
  
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
  
    comments: {
      type: [{
        comment: String,
        commenter: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        createdTime: {
          type: Date,
          default: Date.now
        }
      }],
      default: []
    }
});

module.exports = mongoose.model("Story", StoriesSchema);