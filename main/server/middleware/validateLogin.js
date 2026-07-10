const Joi = require("joi");

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
});

const validateLogin = (req, res, next) => {
    const result = loginSchema.validate(req.body);

    if (result.error) {
        console.log(result.error)
        return res.status(400).json({
            success: false,
            message: result.error.message
        });
    }

    next();
};

module.exports = {
    validateLogin
};