const ClassesModel = require("../../models/Classes/classes.schema");
const UsersModel = require("../../models/Users/user.schema")
const bcrypt = require('bcrypt')
const mongoose = require("mongoose");


class ClassesController {
    constructor() {}

    async createClass(req, res) {
        try {
            const user = req.user;
            const { name } = req.body;

            const oldClass = await ClassesModel.findOne({name});
            if (oldClass) {
                res.send("Class Exists!");
                return
            }

            const newClass = await ClassesModel.create({
                name,
                teacherID: user._id
            });

            res.redirect('/');

        } catch (err) {
            console.log(err);
        }
    }

    async addStudent(req, res) {
        try {
            const { classID } = req.params;
            const { email, name, password } = req.body;

            const student = await UsesModel.findOne({name});
            const classObject = await ClassesModel.findById(classID);
            let studentID;
            const hash = await bcrypt.hash(password, 10);
    
            if (student) {
                if (classObject.studentsIDs.find(item => item.toString() === student._id.toString())) {
                    res.send("This student has been added!");
                    return
                } else {
                    studentID = student._id;
                }

            } else {
                let newStudent = await UsesModel.create({
                    role: 'student',
                    name,
                    email,
                    password: hash
                });

                studentID = newStudent._id;
            }
            
            classObject.studentsIDs.push(mongoose.mongo.ObjectId(studentID));
            
            await classObject.save();
            
            res.redirect(`/class/${classID}/students`);
            
        } catch (err) {
            console.log(err);
        }
    }

    async deleteClass(req, res) {
        try {
            const {classID} = req.params;
            await ClassesModel.findByIdAndDelete(classID);
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new ClassesController();