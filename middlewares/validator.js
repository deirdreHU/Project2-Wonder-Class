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
        res.redirect(req.path + `?message=${valid_results.error.details[0].message}`);
        return
    }

    let valid = (req.body.password === req.body.confirm_password);
    if (!valid) {
        res.redirect(req.path + `?message=passwords do not match`)
        return
    }
    next();
}

exports.loginValidator = function (req, res, next) {

    console.log(req.body)
    const validator = Joi.object({
        name: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
    });

    let valid_results = validator.validate(req.body);

    if (valid_results.error) {
        return res.redirect(req.path + `?message=${valid_results.error.details[0].message}`);
    }
    next();
}


exports.createClassValidator = function (req, res, next) {
    const validator = Joi.object({
        name: Joi.string().min(4).required(),
    });
    
    let valid_results = validator.validate(req.body);
    if (valid_results.error) {
        return res.redirect(req.path + `?message=${valid_results.error.details[0].message}`)
    }
    next();
}

exports.resetPasswordValidator = function (req, res, next) {
    const validator = Joi.object({
        name: Joi.string().min(4).required(),
    });
    
    let valid_results = validator.validate(req.body);
    if (valid_results.error) {
        return res.redirect(req.path + `?message=${valid_results.error.details[0].message}`)
    }
    next();
}