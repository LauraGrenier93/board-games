const {
  Router
} = require('express');

const router = Router();

const mainController = require('./controllers/mainController');
const articleController = require('./controllers/articleController');
const gameController = require('./controllers/gameController');
const userController = require('./controllers/userController');
const eventController = require('./controllers/eventController');
const participantController = require('./controllers/participantController');

const {
  validateQuery,
  validateBody,
  validateParams
} = require('./services/validator');
const userLoginSchema = require('./schemas/userLoginSchema');
const userSigninSchema = require('./schemas/userSigninSchema');
const articleSchema = require('./schemas/articleSchema');
const gameSchema = require('./schemas/gameSchema');
const eventSchema = require('./schemas/eventSchema');
const participantSchema = require('./schemas/participantSchema');

var guard = require('express-jwt-permissions')();
const expressjwt = require('express-jwt');
const blacklist = require('express-jwt-blacklist');

blacklist.configure({
  tokenId: 'jti'
});

/**
 * Home page of the Guardians of the Legend website
 * @route GET /v1/
 * @group home
 * @returns {JSON} 200 - home page
 */
router.get('/', mainController.init);
/**
 * A connetion
 * @typedef {object} connetion
 * @property {string} pseudo - pseudo
 * @property {string} password - password
 */
/**
 * Allows a user to log in to the site.
 * Safe route with Joi
 * @route POST /v1/connetion
 * @group connexion - To connect
 * @summary Delete a user from the database
 * @param {connexion.Model} connexion.body.required - the information to be provided
 * @returns {JSON} 200 - A user has been logged in
 */
router.post('/connexion', validateBody(userLoginSchema), userController.handleLoginForm);
/**
 * One entry
 * @typedef {object} registration
 * @property {string} firstName - firstname
 * @property {string} lastName - lastname
 * @property {string} pseudo - pseudo
 * @property {string} emailAddress - email
 * @property {string} password - password
 * @property {string} passwordConfirm - confirmation of the password
 */
/**
 * Authorises the registration of a user to the site.
 * Safe route with Joi
 * @route POST /v1/inscription
 * @group inscription - To get involved
 * @summary Registers a user in the database
 * @param {inscription.Model} inscription.body.required - the registration information that must be provided
 * @returns {JSON} 200 - a user's data has been inserted into the DB, redirected to the login page
 */
router.post('/inscription', validateBody(userSigninSchema), userController.handleSignupForm);

/**
 * An article
 * @typedef {object} articles
 * @property {number} id - id of the article
 * @property {string} title - titre
 * @property {string} description - description of the game
 * @property {string} createdDate - creation date
 * @property {string} updateDate - date of update
 * @property {number} authorId - reference to the user table
 * @property {number} tagId - reference to the category of the article
 */
/**
 * Displays all articles.
 * @route GET /v1/articles
 * @group articles - article maintenance
 * @summary Displays all items in the database
 * @param {articles.Model} articles.body.required
 * @returns {JSON} 200 - All articles
 */
router.get('/articles', articleController.allArticles);
/**
 * Displays an article.
 * @route GET /v1/articles/:id
 * @group articles - article maintenance
 * @summary Displays an article in the database
 * @param {articles.Model} articles.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - An article was issued
 */
router.get('/articles/:id(\\d+)', articleController.oneArticle);
/**
 * A game
 * @typedef {object} jeux
 * @property {number} id - event id
 * @property {string} title - titre
 * @property {number} minPlayer - minimum number of players
 * @property {number} maxPlayer - maximum number of players
 * @property {number} minAge - minimum age requirement
 * @property {number} duration - average playing time
 * @property {number} quantity - number of copies of the game
 * @property {string} purchasedDate - date of purchase of the game
 * @property {string} creator - name of the game creator
 * @property {string} editor - game developer
 * @property {string} description - description of the game
 * @property {string} year - year of release of the game
 * @property {number} typeId - reference to the type of game
 */
/**
 * Displays all games.
 * @route GET /v1/jeux
 * @group jeux - game management
 * @summary Displays all games in database
 * @param {jeux.Model} jeux.body.required
 * @returns {JSON} 200 - All games have been issued
 */
router.get('/jeux', gameController.allGames);
/**
 * Displays a game.
 * @route GET /v1/jeux/:id
 * @group jeux - game management
 * @summary Display a game in database
 * @param {number} id.path.required - the id to be provided
 * @param {jeux.Model} jeux.body.required
 * @returns {JSON} 200 - A game has been issued
 */
router.get('/jeux/:id(\\d+)', gameController.oneGame);
/**
 * An event
 * @typedef {object}  event
 * @property {number} id - event id
 * @property {string} title - titre
 * @property {string} description - description
 * @property {string} eventDate - date of the event
 * @property {string} createdDate - creation date
 * @property {string} updateDate - date of update
 * @property {number} creatorId - reference to the name of the author of the event
 * @property {number} tagId - reference to the category of the event
 */
/**
 * Displays all events.
 * @route GET /v1/evenements
 * @group evenement - event management
 * @summary Displays all events in the database
 * @param {evenement.Model} evenement.body.required
 * @returns {JSON} 200 - All events have been delivered
 */
router.get('/evenements', eventController.allEvent);
/**
 * Displays an event.
 * @route GET /v1/evenements/:id
 * @group evenement - event management
 * @summary Display an event in the database
 * @param {evenement.Model} evenement.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - An event has been issued
 */
router.get('/evenements/:id(\\d+)', eventController.oneEvent);
//! All roads below this MW will require a permit, 
//! the presence of an unrevoked token in their headers. 
//! Routes that we want to be accessible to non-registered people as well, should therefore be placed on top.
/**
 * A method to allow disconnection in passing by no longer recognising the token as valid.
 * Returns a message in jsons confirming the disconnection.
 * @method logout
 */
router.use(expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  isRevoked: blacklist.isRevoked,
}));
//!------------------------------------------------------------------------------------------------------
/**
 * Allows you to update an article.
 * @route PATCH /v1/articles/:id
 * @group articles - article maintenance
 * @summary Update an article in the database
 * @param {articles.model} articles.body.required
 * @returns {JSON} 200 - An article has been created
 */
router.patch('/articles/:id(\\d+)', validateBody(articleSchema, 'PATCH'), articleController.updateArticle);
/**
 * Allows you to create a new article.
 * @route POST /v1/articles
 * @group articles - article maintenance
 * @summary Insert an article in the database
 * @param {articles.model} articles.body.required
 * @returns {JSON} 200 - An article has been created
 */
router.post('/articles', validateBody(articleSchema, 'POST'), articleController.newArticle);
/**
 * Allows you to delete an item.
 * @route DELETE /v1/articles/:id
 * @group articles - article maintenance
 * @summary Deletes an article from the database
 * @param {articles.model} articles.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - One article has been deleted
 */
router.delete('/articles/:id(\\d+)', articleController.deleteArticle);
/**
 * A game
 * @typedef {object} jeux
 * @property {number} id - game id
 * @property {string} title - titre
 * @property {number} minPlayer - minimum number of players
 * @property {number} maxPlayer - maximum number of players
 * @property {number} minAge - minimum age requirement
 * @property {number} duration - average playing time
 * @property {number} quantity - number of copies of the game
 * @property {string} purchasedDate - date of purchase of the game
 * @property {string} creator - name of the game creator
 * @property {string} editor - game developer
 * @property {string} description - description of the game
 * @property {string} year - year of release of the game
 * @property {number} typeId - reference to the type of game
 */
/**
 * Allows you to create a new game
 * @route POST /v1/jeux
 * @group jeux - game management
 * @summary Insert a game into the database
 * @param {jeux.model} jeux.body.required
 * @returns {JSON} 200 - A game has been created
 */
router.post('/jeux', validateBody(gameSchema, 'POST'), gameController.newGame);
/**
 * Allows you to update a set
 * @route PATCH /v1/jeux/:id
 * @group jeux - game management
 * @summary Update a game in database
 * @param {jeux.model} jeux.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - A game has been updated
 */
router.patch('/jeux/:id(\\d+)', validateBody(gameSchema, 'PATCH'), gameController.updateGame);
/**
 * Allows you to delete a set
 * @route DELETE /v1/jeux/:id
 * @group jeux - game management
 * @summary Deleted a set from the database
 * @param {jeux.model} jeux.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - One game has been deleted
 */
router.delete('/jeux/:id(\\d+)', gameController.deleteGame);
/**
 * Allows you to create a new event.
 * @route POST /v1/evenements
 * @group evenement - event management
 * @summary Inserts an event in the database
 * @param {evenement.model} evenement.body.required
 * @returns {JSON} 200 - An event has been created
 */
router.post('/evenements', validateBody(eventSchema, 'POST'), eventController.newEvent);
/**
 * Allows you to create a new participant.
 * @route POST /v1/participants
 * @group evenement - event management
 * @summary Inserts a participant in the database
 * @param {evenement.model} evenement.body.required
 * @returns {JSON} 200 - An event has been created
 */
router.post('/participants', validateBody(participantSchema), participantController.addParticipant);
/**
 * Allows you to cancel a participation.
 * @route PATCH /v1/participants
 * @group evenement - event management
 * @summary Cancels an entry in the database
 * @param {evenement.model} evenement.body.required
 * @returns {JSON} 200 - An event has been created
 */
router.patch('/participants', participantController.cancelParticipant);
/**
* Allows you to update an event.
* @route PATCH /v1/evenements/:id
* @group evenement - event management
* @summary Update an event in the database
* @param {evenement.model} evenement.body.required
* @param {number} id.path.required - the id to be provided
* @returns {JSON} 200 - An event has been updated
*/
router.patch('/evenements/:id(\\d+)', validateBody(eventSchema, 'PATCH'), eventController.updateEvent);
/**
 * Allows you to delete an event.
 * @route DELETE /v1/evenements/:id
 * @group evenement - event management
 * @summary Deletes an event from the database
 * @param {evenement.model} evenement.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - An event has been deleted
 */
router.delete('/evenements/:id(\\d+)', eventController.deleteEvent);
/**
 * Allows a user to log out of the site.
 * @route GET /v1/deconnexion
 * @group deconnexion - To disconnect
 * @summary disconnects a user
 * @returns {JSON} 200 - A user has been disconnected
 */
router.get('/deconnexion', userController.deconnexion);
//Error handling => invalid token or wrong role:
router.use((err, req, res, next) => {
  if (err.code === 'invalid_token') {
    console.log('Pas de token, pas de chocolat !');
    res.status(401).json('Token invalide, Merci de vous connecter.');
  } else if (err.code === 'permission_denied') {
    res.status(403).json('Accés non autorisé ! Hé alors... on se prend pour un admin ?')
  } else if (err.code === 'revoked_token') {
    res.status(403).json('Vous êtes déconnecté.  Merci de vous reconnecter.')
  }
});

//!-------------------------------------------------------------------------------------------------------
/**
 * A method to allow disconnection in passing by no longer recognising the token as valid.
 * Returns a message in jsons confirming the disconnection.
 * @method logout
 */
 const checkForPermissions = guard
  .check(['Administrateur'])

  router.use(checkForPermissions)
  //--------------------------------------------------------------------------------------------------------------
  /**
   * Displays a user.
   * @route GET /v1/user/:id
   * @group user - user management
   * @summary Display a user in database
   * @param {user.Model} user.body.required
   * @param {number} id.path.required - the id to be provided
   * @returns {JSON} 200 - A user has been issued
   */
   router.get('/user/:id(\\d+)', userController.getUserbyId);

  /**
   * A user
   * @typedef {object} user
   * @property {number} id - user id
   * @property {string} firstName - firstname
   * @property {string} lastName - lastname
   * @property {string} pseudo - pseudo
   * @property {string} emailAddress - email
   * @property {string} password - password
   * @property {string} inscription - date of registration
   * @property {string} avatar - absolute path to an image
   * @property {string} group_id - references to the table that holds the roles
   */

  /**
   * Displays all users
   * @route GET /v1/user
   * @group user - user management
   * @summary Displays all users in database
   * @param {user.Model} user.body.required
   * @returns {JSON} 200 - All users have been issued
   */
  
  //To manage user information:
  router.get('/user', userController.getAllUser);

/**
 *   Changes the information of a user.
 * @route PATCH /v1/user/:id
 * @group user -  user management
 * @summary Modify a user in database
 * @param {user.Model} user.body.required - the user information that can be provided
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - a user's data has been updated
 */
 router.patch('/user/:id(\\d+)', userController.updateUser);

 /**
 * Deletes a user's information.
 * @route DELETE /v1/user/:id
 * @group user - Our API routes
 * @summary Delete a user from the database
 * @param {user.Model} user.body.required
 * @param {number} id.path.required - the id to be provided
 * @returns {JSON} 200 - a user's data has been deleted
 */
  router.delete('/user/:id(\\d+)', userController.deleteUserById);
/**
 * Redirection to a 404 page
 */
router.use((req, res) => {
  res.status(404).send('La route choisie n\'existe pas : http://localhost:3000/api-docs#/');
});
module.exports = router;