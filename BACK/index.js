require('dotenv').config({ path: `${__dirname}/.env.back` });

const cors = require('cors');

const log = require('./app/middlewares/log');
const expressSanitizer = require('express-sanitizer');
const express = require('express');
const router = require('./app/router');

const app = express();

const port = process.env.PORT || 5000;

const expressSwagger = require('express-swagger-generator')(app);
let options = require('./swagger-config.json');
options.basedir = __dirname; 
options.swaggerDefinition.host = `localhost:${port}`;
expressSwagger(options);

app.use(log);

app.use(express.json()); 
 
app.use(express.urlencoded({extended: true})); 

app.use(expressSanitizer()); 

app.use(cors({ 
  optionsSuccessStatus: 200,
  credentials: true, 
  origin:  'http://localhost:8080',
  methods: "GET, PUT, PATCH, POST, DELETE", 
  allowedHeaders : ['Content-Type', 'Authorization'], 
})); 

app.use('/v1', router);
app.listen(port, () => {
  console.log(`API Back jeux de société Running on http://localhost:${port}`);
});
