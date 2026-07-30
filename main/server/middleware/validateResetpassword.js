const Joi = require("joi");

const schema = Joi.object({
    newPassword: Joi.string()
        .min(8)
        .max(30)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password cannot exceed 30 characters",
            "any.required": "Password is required"
        })
});

const validateResetPassword = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
        const err = new Error(error.details[0].message);
        err.statusCode = 400;
        throw err;
    }

    next();
};

module.exports = {validateResetPassword};