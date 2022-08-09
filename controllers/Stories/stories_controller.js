const StoriesModel = require("../../models/stories/stories.schema");
const mongoose = require("mongoose");

class StoriesController {
    async addStoryCommit(req, res) {
        try {
            const {storyID} = req.params;
            const {comment} = req.body;
            const user = req.user;
        await StoriesModel.update(
            {_id: mongoose.mongo.ObjectId(storyID)}, 
            {
                $push: {
                    comments: {
                        comment,
                        commenter: mongoose.mongo.ObjectId(user._id)
                    }
                }
            }
        );
        
        res.redirect(`/story/${storyID}`);
        } catch (err) {
        console.log(err);
        }
    }
}

module.exports = new StoriesController();