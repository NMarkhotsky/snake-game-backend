const Joi = require('joi');

const loginDataValidation = (data) => {
  return Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().min(2).max(16).required().empty(false).messages({
        'string.base': 'The name must be a string',
        'any.required': 'The name field is required',
        'string.empty': 'The name must not be empty',
        'string.min': 'The name must be not less 2 symbols',
        'string.max': 'The name must be not more 16 symbols',
      }),
      password: Joi.string().required().empty(false).messages({
        'string.base': 'The password must be a string',
        'any.required': 'The password field is required',
        'string.empty': 'The password must not be empty',
      }),
    })
    .validate(data);
};

module.exports = loginDataValidation;
