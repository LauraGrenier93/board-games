
/**
 * validates the payload of a request from the schema passed as an argument
 * @param {Joi.schema} schema
 * @returns {Function} middleware Express ready to use
 */
const validateBody = (schema, context) => (request, response, next) => {
  const { error } = schema.validate(request.body, { context: { requestType: context } });

  if (error) {
    response.status(400).json(error.message);
  } else {
    next();
  }
};

/**
 * validates the query string of a request from the schema passed as an argument
 * @param {Joi.schema} schema
 * @returns {Function} middleware Express ready to use
 */
const validateQuery = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.query);

  if (error) {
    response.status(400).json(error.message);
  } else {
    next();
  }
};

/**
 * validates the params of a request from the schema passed as an argument
 * @param {Joi.schema} schema
 * @returns {Function} middleware Express ready to use
 */
const validateParams = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.params);

  if (error) {
    response.status(400).json(error.message);
  } else {
    next();
  }
};

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
};
