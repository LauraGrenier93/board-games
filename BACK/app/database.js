
/**
 * db is a pool of database connectors
 * @module - allows the link with the postgreSQL database
 */
const { Pool } = require('pg');

const db = new Pool();

module.exports = db;








