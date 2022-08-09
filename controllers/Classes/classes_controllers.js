const ClassesModel = require("../../models/classes/classes.schema");
const UsersModel = require("../../models/Users/user.schema");
const StoriesModel = require("../../models/stories/stories.schema");
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");

class ClassesController {
    constructor() {}

    async createClass(req, res) {
        try {
            const user = req.user;
            const { name } = req.body;
            const oldClass = await ClassesModel.findOne({
                teacherID: mongoose.mongo.ObjectId(user._id),
                name
            });

            if (oldClass) {
                return res.status(409).send("Class Exist!");
            }

            const newClass = await ClassesModel.create({
                name,
                teacherID: user._id
            });
            res.redirect('/home');
            
        } catch (err) {
        console.log(err);
        }
    }

    async deleteClass(req, res) {
        try {
            const {classID} = req.params;
            await ClassesModel.findByIdAndDelete(classID);
            res.redirect('/home');
        } catch (err) {
            console.log(err);
        }
    }

    async deleteStudent(req, res) {
        try {
            const { classID, StudentID } = req.params;
            await ClassesModel.update(
                {_id: mongoose.mongo.ObjectId(classID)}, 
                {$pullAll: {studentsIDs: [mongoose.mongo.ObjectId(StudentID)]}}
            )

            res.redirect(`/class/${classID}/students`);
        } catch (err) {
            console.log(err);
        }
    }

    async addStudent(req, res) {
        try {
            const { classID } = req.params;
            const { email, name, password } = req.body;

            const student = await UsersModel.findOne({name});
            const classObject = await ClassesModel.findById(classID);
            let StudentID;
            const hash = await bcrypt.hash(password, 10);
    
            if (student) {
                if (classObject.StudentIDs.find(item => item.toString() === student._id.toString())) {
                    res.send("This student has been added!");
                    return
                } else {
                    StudentID = student._id;
                }

            } else {
                let newStudent = await UsersModel.create({
                    role: 'student',
                    name,
                    email,
                    password: hash
                });

                StudentID = newStudent._id;
            }
            
            classObject.StudentIDs.push(mongoose.mongo.ObjectId(StudentID));
            
            await classObject.save();
            
            res.redirect(`/class/${classID}/students`);
            
        } catch (err) {
            console.log(err);
        }
    }

    async addStory(req, res) {
        try {
            const user = req.user;
            const { classID } = req.params;
            const { title } = req.body;
                
            await StoriesModel.create({
                classID: mongoose.mongo.ObjectId(classID),
                title,
                teacher: mongoose.mongo.ObjectId(user._id)
            });
            
            res.redirect(`/class/${classID}/stories`);
            } catch (err) {
                console.log(err);
            }
    }

    async deleteStory(req, res) {
        const {storyID, classID} = req.params;
        await StoriesModel.findByIdAndDelete(storyID);
        res.redirect(`/class/${classID}/stories`);
    }
}

module.exports = new ClassesController();