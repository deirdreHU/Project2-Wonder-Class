const ClassesModel = require("../../models/classes/classes.schema");
const StoriesModel = require("../../models/stories/stories.schema");
const mongoose = require("mongoose");
const {raw} = require("express");

class PageController {
    constructor() {
        
    }

    showLogin(req, res) {
        res.render('pages/login');
    }

    showRegister(req, res) {
        res.render('pages/register');
    }

    showProfile(req, res) {
        res.render('pages/profile')
    }

    async showClassStories(req, res) {
        const {classID} = req.params;
        const stories = await StoriesModel.find({
            classID: mongoose.mongo.ObjectId(classID)
        })
        res.render('pages/classStories', {
            classID,
            stories
        });
    }

    async showClassStudents(req, res) {
        const {classID} = req.params;
        const classes = await ClassesModel.aggregate([
            {
                $match: {
                    _id: new mongoose.mongo.ObjectId(classID)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'studentsIDs',
                    foreignField: '_id',
                    as: 'students'
                }
            }
        ]);
        
        res.render('pages/classStudents', {
            classID,
            students: classes[0].students
        });
    }

    showAddStudent(req, res) {
        const {classID} = req.params;
        res.render('pages/addStudent', {
            classID
        })
    }

    showAddStory(req, res) {
        const {classID} = req.params;
        res.render('pages/addStory', {classID})
    }

    async showTeacherHome(req, res) {
        const classes = await ClassesModel.find();
        res.render('pages/teacherHome', {classes});
    }

    async showClass(req, res) {
        const {classID} = req.params;
        const stories = await StoriesModel.find({
            classID: mongoose.mongo.ObjectId(classID)
        });
        res.render('pages/class', {
            classID,
            stories
        })
    }

    async showStudentHome(req, res) {
        const user = req.user;
        const classes = await ClassesModel.find({
            studentsIDs: {
            $in: mongoose.mongo.ObjectId(user._id)
            }
        });
        res.render('pages/studentHome', {
            classes
        });
    }

    showCreateClass(req, res) {
        res.render('pages/createClass');
    }

    showHome(req, res) {
        const {role} = req.user;
        if (role === 'teacher') {
            pageController.showTeacherHome(req, res);
        } else if (role === 'student') {
            pageController.showStudentHome(req, res);
        } else {
            res.render('pages/error');
        }
    }
}

let pageController;
module.exports = pageController = new PageController();