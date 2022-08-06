
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
      commenter: mongoose.Schema.Types.ObjectId
    }],
    default: []
  }
});

module.exports = mongoose.model("Story", StoriesSchema);