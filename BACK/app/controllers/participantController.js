const { dayjs } = require('../services/date');
const Participant = require('../models/participant');
const Event = require('../models/event');
const User = require('../models/user');

const participantController = {
    /**
    * A method that supports the creation of a new participant in the DB
    * @name addParticipant
    * @property {int} id - the event id
    * @property {string} pseudo - the username of the user who wants to participate in the event
    * @param {Express.Request} request - the object representing the request
    * @param {Express.Response} response - the object representing the response
    * @return {Object}  - The new participant as a JSON object
    */
    addParticipant: async (req, res) => {
        try {
            const pseudo = req.sanitize(req.body.pseudo);
            const { id } = req.body;
            const event = await Event.findOne(id);
            const user = await User.findByPseudo(pseudo);
            if (event && user) {
                try {
                    const participant = await Participant.findOne(event.id, user.id);
                    participant.cancelledDate = null;
                    await participant.update();
                    console.log(participant);
                    res.json(participant);
                } catch (error) {
                    const newParticipant = new Participant();
                    newParticipant.eventId = event.id;
                    newParticipant.userId = user.id;
                    await newParticipant.save();
                    res.json(newParticipant);
                    console.log(newParticipant)
                }
            }
        } catch (error) {
            console.log(`Erreur lors de l'enregistrement du participant: ${error.message}`);
            res.status(500).json(error.message);
        }
    },
    /**
    * A method that supports the cancellation of a user's participation in the DB
    * @name addParticipant
    * @property {int} id - the event id
    * @property {string} pseudo - the username of the user who wants to participate in the event
    * @param {Express.Request} request - the object representing the request
    * @param {Express.Response} response - the object representing the response
    * @return {Object}  - The new participant as a JSON object
    */
    cancelParticipant: async (req, res) => {
        try {
            const pseudo = req.sanitize(req.body.pseudo);
            const { id } = req.body;
            const event = await Event.findOne(id);
            const user = await User.findByPseudo(pseudo);
            if (event && user) {
                const participant = await Participant.findOne(event.id, user.id);
                participant.cancelledDate = dayjs();
                await participant.update();
                res.json(participant);
                console.log(participant);
            }
        } catch (error) {
            console.log(`Erreur lors de l'annulation du participant: ${error.message}`);
            res.status(500).json(error.message);
        }
    }
};

module.exports = participantController;