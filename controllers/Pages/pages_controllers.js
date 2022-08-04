const ClassesModel = require("../../models/Classes/classes.schema");

class PageController {
    constructor() {}

    showRegister(req, res) {
        res.render('pages/register');
    }

    showLogin(req, res) {
        res.render('pages/login');
    }

    async showTeacherHome(req, res) {
        const classes = await ClassesModel.find();
        res.render('pages/teacherHome', {classes});
    }

    async showStudentHome(req, res) {
        res.render('pages/studentHome');
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

    showProfile(req, res) {
        res.render('pages/profile')
    }

    showCreateClass(req, res) {
        res.render('pages/createClass');
    }

    showAddStudent(req, res) {
        const {classID} = req.params;
        res.render('pages/addStudent', {
            classID
        })
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

    showClassStories(req, res) {
        const {classID} = req.params;
        res.render('pages/classStories', {
            classID
        });
    }
}

let pageController;
module.exports = pageController = new PageController();