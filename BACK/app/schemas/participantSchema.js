const Joi = require('joi');

/**
 * Validates the information received in the body and sent by the users
 * @name participantSchema
 * @group Joi - Checks the information in the body
 * @property {int} id - the event id
 * @property {string} pseudo - the username of the user who wants to register for the event
 * @return {json} messages - A text adapted to the error in json, informing the user of a non-respect of the rules of the validation schema
 */
const participantSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
    pseudo: Joi.string().required()
});

module.exports = participantSchema;