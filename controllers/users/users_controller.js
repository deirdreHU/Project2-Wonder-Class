const bcrypt = require('bcrypt')
const UserModel = require("../../models/users/user.schema");
const crypto = require('crypto')

class UsersController {
    constructor() {
    }

    async updateStudentProfile(req, res) {
        try {
            const user = req.user;
            const { password, birthday } = req.body;
            const hash = await bcrypt.hash(password, 10);

            await UserModel.findByIdAndUpdate(user._id, {
                password: password ? hash : user.password,
                birthday
            });

            res.redirect('/profile/student');
        } catch (err) {
            console.log(err);
        }
    }
    
    async updateTeacherProfile(req, res) {
        try {
            const user = req.user;
            const { password, birthday } = req.body;
            const hash = await bcrypt.hash(password, 10);

            await UserModel.findByIdAndUpdate(user._id, {
                password: password ? hash : user.password,
                birthday
            });
            
            res.redirect('/profile/teacher');
        } catch (err) {
            console.log(err);
        }
    }

    async findStudentNames(req, res) {
        try {
            const {student_name} = req.params;
            const students = await UserModel.find({
                name: {
                    $regex: new RegExp(`.*${student_name}.*`)
                },
                role: 'student'
            });
            //return an object
            res.json(students);
        } catch (err) {
            console.log(err);
        }
    }

    async logout(req, res) {
        req.session.user = null

        req.session.save(function (err) {
            if (err) {
                res.redirect('/login')
                return
            }

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) {
                    res.redirect('/users/login')
                    return
                }
                res.redirect('/')
            })
        })
    }

    async login(req, res) {
        try {
            const {name, password} = req.body;
            console.log("password value", password)
            const user = await UserModel.findOne({name});
            console.log(user)
            const passwordMatches = await bcrypt.compare(password, user.password);
            
            if (!passwordMatches) {
                res.send("incorrect password");
                return
            }

            // log the user in by creating a session
            req.session.regenerate(function (err) {
                if (err) {
                    res.send('unable to regenerate seesion')
                    return
                }
    
                // store user information in session, typically a user id
                req.session.user = user;
    
                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                    if (err) {
                    return next(err)
                }
                res.redirect('/home')
                })
            })

        } catch (err) {
            console.log(err);
            res.send('failed to login')
        }
    }

    async register(req, res) {
        try {
            const old_user = await UserModel.findOne({email: req.body.email});
            if (old_user) {
                res.send("User already exists!");
                return
            }

            const hash = await bcrypt.hash(req.body.password, 10);
            
            await UserModel.create({
                name: req.body.name,
                email: req.body.email,
                role: 'teacher',
                password: hash
            });
            
            res.redirect('/users/login/teacher');
        
        } catch (err) {
            console.log(err);
            res.send('failed to create user')
            return
        }
    }

    async resetPassword(req, res) {
        try {
            console.log(req.body);
            const user = await UserModel.findOne({name: req.body.name});
            if(!user) {
                res.send("User doesn't exists");
            }
            else {
                crypto.randomBytes(5, async (err, buffer) => {
                    if(err) {
                        throw err;
                    }
                    else {
                        const newPassword = buffer.toString('hex');
                        const hash = await bcrypt.hash(newPassword, 10);
                        const newUser = await UserModel.findOneAndUpdate({name: req.body.name}, {password: hash});
                        res.send("<p>Reset password successful. Your new password is " + newPassword + "</p> <p><a href=/>Click here to go home</a></p>");
                    }
                });
            }
        }
        catch(err) {
            console.log(err);
            res.send("Failed to reset password");
        }
    }
}


module.exports = new UsersController();