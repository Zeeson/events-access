const Joi = require('@hapi/joi');

const UserValid = user => {
  const UserSchema = Joi.object({
    username: Joi.string()
      .min(1)
      .required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
      .required()
  });
  const { error, value } = UserSchema.validate(user);
  return {
    error,
    value
  };
};
const ClientValid = user => {
  const UserSchema = Joi.object({
    name: Joi.string()
      .min(1)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    wordcount: Joi.number().max(5)
  });
  const { error, value } = UserSchema.validate(user);
  return {
    error,
    value
  };
};

module.exports.userValid = UserValid;
module.exports.clientValid = ClientValid;
