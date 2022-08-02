const ClassesModel = require("../../models/Classes/classes.schema");
const UsesModel = require("../../models/Users/user.schema");
const mongoose = require("mongoose");


class ClassesController {
    constructor() {}

async createClass(req, res) {
    try {
        const user = req.user;
        console.log(user)
        const { name } = req.body;
        console.log(req.body)

        const oldClass = await ClassesModel.findOne({name});
        if (oldClass) {
            return res.send("Class Exists!");
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

        const student = await UsesModel.findOne({email});
        const classObject = await ClassesModel.findById(classID);
        let studentID;

        if (student) {
            studentID = student._id;
        } else {
            let newStudent = await UsesModel.create({
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