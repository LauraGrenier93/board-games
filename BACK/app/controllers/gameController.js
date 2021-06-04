const Game = require('../models/game');
const { formatForGame } = require('../services/date');
const getPreview = require('../services/preview');

const gameController = {
  /**
   * Method for retrieving information on all games
   * @param {Express.Response} res - the object representing the response
   * @return {Object}  - Games as JSON objects
   */
  allGames: async (_, res) => {
    try {
      const games = await Game.findAll();
      const gamesFormat = games.map(game => {
        game.purchasedDate = formatForGame(game.purchasedDate);
        return game;
      });
      getPreview(gamesFormat);
      console.log(gamesFormat);
      res.json(gamesFormat);
    } catch (error) {
      console.log(error.message);
      res.status(404).json(error.message);
    }
  },
  /**
   * Method for retrieving information about a game
   * @property {int} id - the game id sought
   * @param {Express.Request} req - the object representing the request
   * @param {Express.Response} res - the object representing the response
   * @return {Object}  - The object set as a JSON object
   */
  oneGame: async (req, res) => {
    try {
      const { id } = req.params;
      const game = await Game.findOne(id);
      game.purchasedDate = formatForGame(game.purchasedDate);
      console.log(game);
      res.json(game);
    } catch (error) {
      console.log(error.message);
      res.status(404).json(error.message);
    }
  },
  /**
  * A method that supports the creation of a new set in the DB
  * @name newGame
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
  * @param {Express.Request} request - the object representing the request
  * @param {Express.Response} response - the object representing the response
  * @return {Object}  - The new game as a JSON object
  */
  newGame: async (req, res) => {
    try {
      const data = {};
      data.title = req.sanitize(req.body.title);
      data.minPlayer = req.sanitize(req.body.minPlayer);
      data.maxPlayer = req.sanitize(req.body.maxPlayer);
      data.minAge = req.sanitize(req.body.minAge);
      data.duration = req.sanitize(req.body.duration);
      data.quantity = req.sanitize(req.body.quantity);
      data.creator = req.sanitize(req.body.creator);
      data.editor = req.sanitize(req.body.editor);
      data.description = req.sanitize(req.body.description);
      data.year = req.sanitize(req.body.year);
      data.typeId = req.sanitize(req.body.typeId);
      data.gameCategories = req.sanitize(req.body.gameCategories);

      if (typeof data.duration === "object") {
        data.duration = 60 * data.duration.hours + data.duration.minutes;
      }

      const newGame = new Game(data);
      await newGame.save();
      res.json(newGame);
    } catch (error) {
      console.log(`Erreur lors de l'enregistrement du jeu: ${error.message}`);
      res.status(500).json(error.message);
    }
  },
  /**
  * A method that supports the updating of a set in the DB
  * @name updateGame
  * @property {int} id - the game id sought
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
  * @param {Express.Request} request - the object representing the request
  * @param {Express.Response} response - the object representing the response
  * @return {Object}  - The game updated as a JSON object
  */
  updateGame: async (req, res) => {
    try {
      const { id } = req.params;
      const NewData = {};
      newData.title = req.sanitize(req.body.title);
      newData.minPlayer = req.sanitize(req.body.minPlayer);
      newData.maxPlayer = req.sanitize(req.body.maxPlayer);
      newData.minAge = req.sanitize(req.body.minAge);
      newData.duration = req.sanitize(req.body.duration);
      newData.quantity = req.sanitize(req.body.quantity);
      newData.creator = req.sanitize(req.body.creator);
      newData.editor = req.sanitize(req.body.editor);
      newData.description = req.sanitize(req.body.description);
      newData.year = req.sanitize(req.body.year);
      newData.typeId = req.sanitize(req.body.typeId);
      newData.gameCategories = req.sanitize(req.body.gameCategories);
      const game = await Game.findOne(id);

      if (typeof newData.duration === "object") {
        newData.duration = 60 * newData.duration.hours + newData.duration.minutes + ' minutes';
      }

      if (newData.title) {
        game.title = newData.title;
      }

      if (newData.minPlayer) {
        game.minPlayer = newData.minPlayer;
      }

      if (newData.maxPlayer) {
        game.maxPlayer = newData.maxPlayer;
      }

      if (newData.minAge) {
        game.minAge = newData.minAge;
      }

      if (newData.duration) {
        game.duration = newData.duration;
      }

      if (newData.quantity) {
        game.quantity = newData.quantity;
      }

      if (newData.creator) {
        game.creator = newData.creator;
      }

      if (newData.editor) {
        game.editor = newData.editor;
      }

      if (newData.description) {
        game.description = newData.description;
      }

      if (newData.year) {
        game.year = newData.year;
      }

      if (newData.typeId) {
        game.typeId = newData.typeId;
      }

      if (newData.gameCategories) {
        game.gameCategories = newData.gameCategories;
      }

      await game.update();
      res.json(game);
    } catch (error) {
      console.log(`Erreur lors de la mise à jour du jeu: ${error.message}`);
      res.status(500).json(error.message)
    }
  },
/**
 * method of suppressing a board game
 * @param {request} req 
 * @param {response} res 
 */
  deleteGame: async (req, res) => {
    try {
      const { id } = req.params;
      const game = await Game.findOne(id);
      await game.delete();
      res.json(`Le jeu avec l'${id} a été supprimé`);
    } catch (error) {
      console.log(`Erreur lors de la suppresion du jeu: ${error.message}`);
      res.status(500).json(error.message)
    }
  }
};

module.exports = gameController;
