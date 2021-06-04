const Joi = require('joi');

/**
 * Validates the information received in the body and sent by the users
 * @name eventSchema
 * @group Joi - Checks the information in the body
 * @property {string} title - the title an event should have
 * @property {string} description - the description of the event, which is compulsory and must be at least 15 characters long
 * @property {date} eventDate - the date on which the event will take place
 * @property {int} creatorId - the id of the creator of the event
 * @property {int} tagId - the id of the category to which the event belongs
 * @property {string||array} eventGames - the names of the games associated with the event
 * @return {json} messages - A text adapted to the error in json, informing the user of a non-respect of the rules of the validation schema
 */
const eventSchema = Joi.object({
  title: Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
  description: Joi.string().min(15).when('$requestType', { is: 'POST', then: Joi.required() }),
  eventDate: Joi.date().when('$requestType', { is: 'POST', then: Joi.required() }),
  creatorId: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  tagId: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  eventGames: [
    Joi.string(),
    Joi.array().items(Joi.string().required())
  ]
});

module.exports = eventSchema;
