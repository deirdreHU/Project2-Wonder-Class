require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')

const app = express();
const PORT = process.env.PORT || 3000;

const UsersController = require("./controllers/users/users_controller");
const PagesController = require("./controllers/pages/pages_controllers");
const ClassesController = require("./controllers/classes/classes_controllers");
const {registerValidator, loginValidator} = require("./middlewares/validator");
const {isAuthenticated, isTeacher} = require("./middlewares/auth.middleware");

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

app.get('/', isAuthenticated, PagesController.showHome);

app.get('/users/register', PagesController.showRegister);
app.post('/users/register', registerValidator, UsersController.register);
app.get('/users/login', PagesController.showLogin);
app.post('/users/login', loginValidator, UsersController.login);
app.post('/users/logout', UsersController.logout);
app.get('/users/profile', PagesController.showProfile);

app.post('/class/create', isAuthenticated, isTeacher, ClassesController.createClass);
app.post('/class/add-student', isAuthenticated, isTeacher, ClassesController.addStudent);

app.listen(PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`The server set up at port ${PORT}`);
    } catch (err) {
    console.log(`Failed to connect to DB`)
    process.exit(1)
    }
})