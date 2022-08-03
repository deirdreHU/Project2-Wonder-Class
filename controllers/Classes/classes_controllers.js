const ClassesModel = require("../../models/Classes/classes.schema");
const UsersModel = require("../../models/Users/user.schema")
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
            res.send("fail to create class")
            return
        }
    }

    async addStudent(req, res) {
        try {
            const { classID } = req.params;
            const { email, name, password } = req.body;

            const student = await UsersModel.findOne({email});
            const classObject = await ClassesModel.findById(classID);
            let studentID;

            if (student) {
                studentID = student._id;
            } else {
                let newStudent = await UsersModel.create({
                    role: 'student',
                    name,
                    email,
                    password
                });
                studentID = newStudent._id;
            }

            classObject.studentsIDs.push(mongoose.mongo.ObjectId(studentID));
            
            res.redirect('/');

        } catch (err) {
            console.log(err);
            res.send("fail to add students")
            return

        }
    }
}

    module.exports = new ClassesController();