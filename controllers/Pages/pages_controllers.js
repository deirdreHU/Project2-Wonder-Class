const ClassesModel = require("../../models/Classes/classes.schema");

class PageController {
    constructor() {}

    showLogin(req, res) {
        res.render('pages/login');
    }

    showRegister(req, res) {
        res.render('pages/register');
    }

    showProfile(req, res) {
        res.render('pages/profile')
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
}

let pageController;
module.exports = pageController = new PageController();