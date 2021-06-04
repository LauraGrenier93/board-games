const express = require('express');

const log = express();

/**
 * A middleware that gives in console the ip address, the date and the url requested by this same ip address.
 * 
 */
log.use((req, res, next) => {
 
  const now = new Date();

  console.log(`Date de la connexion : ${now.toISOString()} /// Adresse ip de la connexion : ${req.ip} /// URL demandée : ${req.url}`);

  next();
})
module.exports = log;
