const Joi = require('joi')

//Register
exports.registerValidator = function(req, res, next) {
const validator = Joi.object({
    role: Joi.string().valid('teacher', 'student'),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirm_password: Joi.string().min(4).required()
});


let valid_results = validator.validate(req.body);
if (valid_results.error) {
    res.status(400).send(valid_results.error);
    return
}

let valid = (req.body.password === req.body.confirm_password);
if (!valid) {
    res.status(400).send("passwords do not match");
    return 
}
next();
}

//Log in
exports.loginValidator = function (req, res, next) {
const validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
});

let valid_results = validator.validate(req.body);
if (valid_results.error) {
    res.status(400).send(valid_results.error);
    return 
}
next();
}