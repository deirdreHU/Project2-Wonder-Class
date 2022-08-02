const Joi = require('joi')

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
        return res.send(valid_results.error);
    }

    let valid = (req.body.password === req.body.confirm_password);
    if (!valid) {
        res.send("passwords do not match");
        return
    }

    next();
}

exports.loginValidator = function (req, res, next) {
    console.log(req.body)
    const validator = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
    });

    let valid_results = validator.validate(req.body);
    
    if (valid_results.error) {
        return res.status(400).send(valid_results.error);
    }

    next();
}