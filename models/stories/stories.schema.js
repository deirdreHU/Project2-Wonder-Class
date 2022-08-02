const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema({
    title: String,
    comments: [{
        comment: String,
        commenter: mongoose.Schema.Types.ObjectId,
    }]
});

module.exports = mongoose.model("Story", StoriesSchema);