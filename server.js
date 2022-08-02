require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')

const app = express();
const PORT = process.env.PORT; //3000
const {registerValidator, loginValidator} = require("./middlewares/validators");


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

app.get('/users/register', PagesController.showRegister);
app.post('/users/register', registerValidator, UsersController.register);
app.get('/users/login', PagesController.showLogin);
app.post('/users/login', loginValidator, UsersController.login);
app.post('/users/logout', UsersController.logout);
app.get('/users/profile', PagesController.showProfile);

app.listen(PORT, async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(`The server set up at port ${PORT}`);
    } catch (err) {
    console.log(`Failed to connect to DB`)
    process.exit(1)
    }
})