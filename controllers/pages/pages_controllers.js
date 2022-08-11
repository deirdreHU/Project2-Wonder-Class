const ClassesModel = require("../../models/classes/classes.schema");
const StoriesModel = require("../../models/stories/stories.schema");
const UsersModel = require("../../models/users/user.schema")
const mongoose = require("mongoose");
const moment = require("moment");
const {raw} = require("express");

class PageController {
    constructor() { }

    showEntry(req, res) {
        res.render('pages/home');
    }

    showLogin(req, res) {
        res.render('pages/login');
    }
    
    showStudentLogin(req, res) {
        res.render('pages/studentLogin');
    }
    
    showTeacherLogin(req, res) {
        res.render('pages/teacherLogin');
    }
    
    showResetPassword(req,res) {
        res.render('pages/resetPassword')
    }

    async showStudentProfile(req, res) {
        let user = req.user;
        let userProfile = await UsersModel.findById(user._id).lean();
        res.render('pages/studentProfile', {
            user: userProfile
        });
    }
    
    async showTeacherProfile(req, res) {
        let user = req.user;
        let userProfile = await UsersModel.findById(user._id).lean();
        res.render('pages/teacherProfile', {
            user: userProfile
        });
    }

    async showStory(req, res) {
        const {storyID} = req.params;
        const story = await StoriesModel.findById(storyID).populate("comments.commenter");
        res.render('pages/story', {
            storyID,
            story,
            role: req.session.user.role
        });
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
                    localField: 'StudentIDs',
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
        const user = req.user;
        const classes = await ClassesModel.find({
            TeacherID: mongoose.mongo.ObjectId(user._id)
        });
        console.log(user._id)
        res.render('pages/teacherHome', {classes});
        console.log(classes)
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
            StudentIDs:{
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

        console.log(req.user)

        if (role === "teacher") {
            pageController.showTeacherHome(req, res);
        } else if (role === "student") {
            pageController.showStudentHome(req, res);
        } else {
            res.render('pages/error');
        }
    }
}

let pageController;
module.exports = pageController = new PageController();