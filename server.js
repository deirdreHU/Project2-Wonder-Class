require("dotenv").config();

const express = require("express");
const methodOverride = require('method-override')
const mongoose = require("mongoose");
const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@gafirstlessontry.4sre1.mongodb.net/?retryWrites=true&w=majority`

const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session')

// const UsersController = require("./controllers/users/users_controller");
const PagesController = require("./controllers/pages/pages_controllers");
// const ClassesController = require("./controllers/classes/classes_controllers");
// const StoriesController = require("./controllers/stories/stories_controller");
// const {registerValidator, loginValidator, createClassValidator,resetPasswordValidator} = require("./middlewares/validator");
// const {isAuthenticated, isTeacher} = require("./middlewares/auth.middleware");

// Set view engine
app.set('view engine', 'ejs')

// Apply middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, maxAge: 7200000 }
}))

app.get('/', PagesController.showEntry);

// app.get('/home', isAuthenticated, PagesController.showHome);

// app.get('/users/register', PagesController.showRegister);
// app.post('/users/register', registerValidator, UsersController.register);

// app.get('/users/resetpassword', PagesController.showResetPassword);
// app.post('/users/resetpassword', resetPasswordValidator, UsersController.resetPassword);

// app.get('/users/login/student', PagesController.showStudentLogin);
// app.get('/users/login/teacher', PagesController.showTeacherLogin);
// app.post('/users/login', loginValidator, UsersController.login);

// app.get('/users/logout', UsersController.logout);
// app.get('/users/profile', isAuthenticated, PagesController.showProfile);

// app.get('/students/find/:student_name', isAuthenticated, isTeacher, UsersController.findStudentNames); 

// app.post('/class/create', isAuthenticated, isTeacher, createClassValidator, ClassesController.createClass);
// app.get('/class/create', PagesController.showCreateClass);
// app.get('/class/delete/:classID', isAuthenticated, isTeacher, ClassesController.deleteClass);

// app.get('/class/:classID', isAuthenticated, PagesController.showClass);

// app.get('/class/:classID/students', isAuthenticated, isTeacher, PagesController.showClassStudents);
// app.get('/class/:classID/stories', isAuthenticated, isTeacher, PagesController.showClassStories);
// app.get('/class/detail/:classID', isAuthenticated, isTeacher, (req, res) => {
//     const {classID} = req.params;
//     res.redirect(`/class/${classID}/students`);
// });

// app.get('/class/:classID/students/add', isAuthenticated, isTeacher, PagesController.showAddStudent);
// app.post('/class/:classID/students/add', isAuthenticated, isTeacher, ClassesController.addStudent);
// app.get('/class/:classID/students/:studentID/delete', isAuthenticated, isTeacher, ClassesController.deleteStudent);

// app.get('/class/:classID/stories/add', isAuthenticated, isTeacher, PagesController.showAddStory);
// app.post('/class/:classID/stories/add', isAuthenticated, isTeacher, ClassesController.addStory);
// app.get('/class/:classID/stories/:storyID/delete', isAuthenticated, isTeacher, ClassesController.deleteStory);

// app.get('/story/:storyID', isAuthenticated, PagesController.showStory);
// app.post('/story/:storyID/comment', isAuthenticated, StoriesController.addStorycomment);

// app.get('/profile/teacher', isAuthenticated, isTeacher, PagesController.showTeacherProfile);
// app.post('/profile/teacher', isAuthenticated, isTeacher, UsersController.updateTeacherProfile);

// app.get('/profile/student', isAuthenticated, PagesController.showStudentProfile);
// app.post('/profile/student', isAuthenticated, UsersController.updateStudentProfile);

app.listen(PORT, async () => {
    try {
        await mongoose.connect(connStr);
        console.log(`The server set up at port ${PORT}`);
    } catch (err) {
    console.log(`Failed to connect to DB`)
    process.exit(1)
    }
})