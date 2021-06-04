const Event = require('../models/event');
const { formatForArticle, formatForBack } = require('../services/date');

const eventController = {
  /**
     * Method of fetching information on all events
     * @param {Express.Response} res - the object representing the response
     * @return {Object}  - Events in the form of a JSON object
     */
  allEvent: async (_, res) => {
    try {
      const events = await Event.findAll();
      const eventsFormat = events.map(event => {
        event.eventDate = formatForArticle(event.eventDate);
        event.createdDate = formatForArticle(event.createdDate);
        if (event.updateDate) {
          event.updateDate = formatForArticle(event.eventDate);
        }
        return event;
      });
      console.log(eventsFormat);
      res.json(eventsFormat);
    } catch (error) {
      console.log(error.message);
      res.status(404).json(error.message);
    }
  },
  /**
  * Method for retrieving information about an event
  * @property {int} id - the id of the searched event
  * @param {Express.Request} req - the object representing the request
  * @param {Express.Response} res - the object representing the response
  * @return {Object}  - The event as a JSON object
  */
  oneEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne(id);
      event.eventDate = formatForArticle(event.eventDate);
      event.createdDate = formatForArticle(event.createdDate);
      if (event.updateDate) {
        event.updateDate = formatForArticle(event.eventDate);
      }

      console.log(event);
      res.json(event);
    } catch (error) {
      console.log(error.message);
      res.status(404).json(error.message);
    }
  },
  /**
  * A method that handles the creation of a new event in the DB
  * @name newEvent
  * @property {string} title - the title an event should have
  * @property {string} description - the description of the event, which is compulsory and must be at least 15 characters long
  * @property {date} eventDate - the date on which the event will take place
  * @property {int} creatorId - the id of the creator of the event
  * @property {int} tagId - the id of the category to which the event belongs
  * @property {string||array} eventGames - the names of the games associated with the event
  * @param {Express.Request} request - the object representing the request
  * @param {Express.Response} response - the object representing the response
  * @return {Object}  - The new event as a JSON object
  */

  newEvent: async (req, res) => {
    try {
      // console.log("controler newEvent", req.body);
      const data = {};
      data.title = req.sanitize(req.body.title);
      data.description = req.sanitize(req.body.description);
      data.eventDate = req.sanitize(req.body.eventDate);
      data.creatorId = req.sanitize(req.body.creatorId);
      data.eventGames = req.sanitize(req.body.eventGames);
      data.tagId = req.sanitize(req.body.tagId);

      data.eventDate = formatForBack(data.eventDate);
      const newEvent = new Event(data);
      await newEvent.save();
      res.json(newEvent);
    } catch (error) {
      console.log(`Erreur lors de l'enregistrement de l'évènement: ${error.message}`);
      res.status(500).json(error.message);
    }
  },
  /**
  * A method that supports the updating of an article in the DB
  * @name updateEvent
  * @property {int} id - the id of the searched event
  * @property {string} title - the title an event should have
  * @property {string} description - the description of the event, which is compulsory and must be at least 15 characters long
  * @property {date} eventDate - the date on which the event will take place
  * @property {int} creatorId - the id of the creator of the event
  * @property {int} tagId - the id of the category to which the event belongs
  * @property {string||array} eventGames - the names of the games associated with the event
  * @param {Express.Request} request - the object representing the request
  * @param {Express.Response} response - the object representing the response
  * @return {Object}  - The event updated as a JSON object
  */
  updateEvent: async (req, res) => {
    try {
      const { id } = req.params;

      const NewData = {};
      NewData.title = req.sanitize(req.body.title);
      NewData.description = req.sanitize(req.body.description);
      NewData.eventDate = req.sanitize(req.body.eventDate);
      NewData.creatorId = req.sanitize(req.body.creatorId);
      NewData.eventGames = req.sanitize(req.body.eventGames);
      NewData.tagId = req.sanitize(req.body.tagId);
      const event = await Event.findOne(id);

      if (newData.title) {
        event.title = newData.title;
      }

      if (newData.description) {
        event.description = newData.description;
      }

      if (newData.eventDate) {
        event.eventDate = newData.eventDate;
      }


      if (newData.tagId) {
        event.tagId = newData.tagId;
      }

      if (newData.eventGames) {
        event.eventGames = newData.eventGames;
      }

      await event.update();
      res.json(event);
    } catch (error) {
      console.log(`Erreur lors de la mise à jour de l'évènement: ${error.message}`);
      res.status(500).json(error.message);
    }
  },
  /**
  * Method to delete an event
  * @property {int} id - the id of the searched event
  * @param {Express.Request} req - the object representing the request
  * @param {Express.Response} res - the object representing the response
  * @return {String}  - A JSON string confirming the deletion
  */
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      const event = await Event.findOne(id);

      await event.delete();
      res.json(`L'évènement avec l'${id} a été supprimé`);
    } catch (error) {
      console.log(`Erreur lors de la suppression de l'évènement: ${error.message}`);
      res.status(500).json(error.message);
    }
  }
};

module.exports = eventController;
