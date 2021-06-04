const Joi = require('joi');

// doc JOI => https://joi.dev/api/?v=17.4.0
// https://github.com/sideway/joi/blob/v17.4.0/API.md#list-of-errors


/**
 * Validates the information received in the body and sent by the users
 * @name userSigninSchema 
 * @group Joi - Checks the information in the body
 * @property {string} pseudo - The username a user uses to log in must not be identical to another username and must contain a minimum of 3 characters and a maximum of 40 characters, without spaces. 
 * @property {string} password - the password of a user, must have at least 8 characters, a lower case letter, an upper case letter, a number and a special character among : (@#$%^&*)
 * @property {string} passwordConfirm - must be identical to the password
 * @property {string} fisrtName - The user's firstname, which must contain at least 2 characters, without spaces.
 * @property {string} lastName - the user's lastname must contain at least 2 characters, without spaces.
 * @property {string} emailAddress - the email address of a user must not already be registered in the database and must correspond to a valid format
 * @return {json} messages - An adapted text in case of error, in json, informing the user of a non-respect of the rules of the validation schema
 */
const userSigninSchema = Joi.object({
  firstName: Joi.string()
      .min(2)
      .required()
      .pattern(/^\S{2,}$/)
      .messages({
        'string.empty': `Le champs de votre prénom ne peut être vide !`,
        'string.min': `Votre prenom doit avoir une longeur minimum de {#limit} caractéres !`,
        'string.pattern.base':'Le format de votre prénom est incorrect : il doit contenir au minimum 2 caractéres et ne pas être composé d\'espaces !',

      }),
  lastName: Joi.string()
      .min(2)
      .required()
      .pattern(/^\S{2,}$/)
      .messages({
        'string.empty': `Le champs de votre nom ne peut être vide !`,
        'string.min': `Votre nom doit avoir une longeur minimum de {#limit} caractéres !`,
        'string.pattern.base':'Le format de votre nom est incorrect : il doit contenir au minimum 2 caractéres et ne pas être composé d\'espaces ! ',

      }),
  emailAddress: Joi.string()
     .pattern(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
      .required()
      .messages({
        'string.empty': `Le champs de votre email ne peut être vide !`,
        'string.pattern.base':'Le format de votre email est incorrect',
      }),
  pseudo: Joi.string()
     .min(3).max(40)
     .pattern(/^\S{3,}$/)
     .required()
     .messages({
      'string.empty': `Le champs de votre pseudo ne peut être vide !`,
      'string.min': `Votre pseudo doit doit avoir un minimum de {#limit} caractéres!`,
      'string.max': ` Votre pseudo doit doit avoir un maximum de {#limit} caractéres !`,
      'string.pattern.base':' Le format de votre pseudo est incorrect : il doit contenir au minimum 3 caractéres et ne pas être composé d\'espaces !',

    }),
  password: Joi.string()
     .pattern(new RegExp(/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/))
     .required()
     .messages({
      'string.pattern.base':'Le format de votre mot de passe est incorrect : Il doit contenir au minimum 8 caractéres avec minimum, un chiffre, une lettre majuscule, une lettre minuscule et un carctére spécial parmis : ! @ # $% ^ & * ',
     }),
  passwordConfirm: Joi.ref('password')
}).with('password', 'passwordConfirm');

module.exports = userSigninSchema;
