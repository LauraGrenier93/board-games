const Joi = require('joi');

/**
* Validates the information received in the body and sent by the users
* @name articleSchema
* @group Joi - Checks the information in the body
* @property {string} title - the title of the game
* @property {int} minPlayer - the minimum number of players required to play the game
* @property {int} maxPlayer - the maximum number of players to play the game
* @property {int} minAge - the minimum age for playing the game
* @property {int||object} duration - the average length of a game
* @property {int} quantity - the number of copies of the game we have
* @property {string} creator - the name of the game's creator
* @property {string} editor - the name of the game's publisher
* @property {string} description - the game description
* @property {int} year - the year the game was released
* @property {int} typeId - the type id (base game or DLC) of the game
* @property {string||array} gameCategories - the categories of the game
* @return {json} messages -  A text adapted to the error in json, informing the user of a non-respect of the rules of the validation a
*/
const gameSchema = Joi.object({
  title: Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
  minPlayer: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  maxPlayer: Joi.number().integer().positive().min(Joi.ref('minPlayer')).when('$requestType', { is: 'POST', then: Joi.required() }),
  minAge: Joi.number().integer().positive().min(0).max(100).when('$requestType', { is: 'POST', then: Joi.required() }),
  duration: [
    Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }), // en minutes
    Joi.object({
      hours: Joi.number().integer().positive().required(),
      minutes: Joi.number().integer().positive().required()
    }).when('$requestType', { is: 'POST', then: Joi.required() })
  ],
  quantity: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  creator: Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
  editor: Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
  description: Joi.string().min(15).when('$requestType', { is: 'POST', then: Joi.required() }),
  year: Joi.number().integer().positive().min(1900).max(2100).when('$requestType', { is: 'POST', then: Joi.required() }),
  typeId: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  gameCategories: [
    Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
    Joi.array().items(Joi.string().required()).when('$requestType', { is: 'POST', then: Joi.required() })
  ]
});

module.exports = gameSchema;
