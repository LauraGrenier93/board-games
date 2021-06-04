const Joi = require('joi');
// doc JOI => https://joi.dev/api/?v=17.4.0
/**
 * Validates the information received in the body and sent by the users
 * @name userLoginSchema 
 * @group Joi - Checks the information in the body
 * @property {string} pseudo - The username a user uses to log in must not be identical to another username and must contain a minimum of 3 characters and a maximum of 40 characters, without spaces. 
 * @property {string} password - the password of a user, must have at least 8 characters, a lower case letter, an upper case letter, a number and a special character among : (@#$%^&*)
 * @return {json} messages - A text adapted to the error in json, informing the user of a non-respect of the rules of the validation schema
 */
const userLoginSchema = Joi.object({
  pseudo: Joi.string()
      .min(3)
      .max(40)
      .required()
      .messages({
        'string.empty': `Le champs de votre pseudo ne peut être vide !`,
        'string.min': `Votre pseudo doit doit avoir un minimum de {#limit} caractéres!`,
        'string.max': `Votre pseudo doit doit avoir un maximum de {#limit} caractéres !`,
      }),
  password: Joi.string()
      .pattern(new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/))
      .required()
      .messages({
    'string.pattern.base':'Le format de votre mot de passe est incorrect : Il doit contenir au minimum 8 caractéres avec minimum, un chiffre, une lettre majuscule, une lettre minuscule et un carctére spécial parmis : ! @ # $% ^ & *',
   }),
});
module.exports = userLoginSchema;
