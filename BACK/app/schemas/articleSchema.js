const Joi = require('joi');

/**
 * Validates the information received in the body and sent by the users
 * @name articleSchema
 * @group Joi - Checks the information in the body
 * @property {string} title - the title an article should have
 * @property {string} description - the content of the article, which is compulsory and must be at least 15 characters long
 * @property {int} authorId - the id of the author of the article
 * @property {int} tagId - the id of the category to which the item belongs
 * @return {json} messages - A text adapted to the error in json, informing the user of a non-respect of the rules of the validation schema
 */
const articleSchema = Joi.object({
  title: Joi.string().when('$requestType', { is: 'POST', then: Joi.required() }),
  description: Joi.string().min(15).when('$requestType', { is: 'POST', then: Joi.required() }),
  authorId: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
  tagId: Joi.number().integer().positive().when('$requestType', { is: 'POST', then: Joi.required() }),
});

module.exports = articleSchema;
