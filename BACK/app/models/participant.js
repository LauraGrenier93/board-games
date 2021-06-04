const db = require('../database');

class Participant {
    id;
    eventId;
    userId;
    inscriptionDate;
    cancelledDate;

    set event_id(val) {
        this.eventId = val;
    }

    set user_id(val) {
        this.userId = val;
    }

    set inscription_date(val) {
        this.inscriptionDate = val;
    }

    set cancelled_date(val) {
        this.cancelledDate = val;
    }

    /**
     * @constructor
     * @param {Object} data - object containing the values for the instance
     */
    constructor(data = {}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }
    /**
     * Method for fetching information related to an event passed in parameters
     * @param eventId - id of an event
     * @param userId - id of a user
     * @returns - the information of the requested participant
     * @static - a static method
     * @async - an asynchronous method
     */
    static async findOne(eventId, userId) {
        const { rows } = await db.query(`SELECT * FROM event_has_participant WHERE event_id = $1 AND user_id = $2;`, [eventId, userId]);

        if (!rows[0]) {
            throw new Error(`Cette personne ne s'est pas inscrit à cet évènement.`);
        }

        return new Participant(rows[0]);
    }
    /**
    * Method for inserting information about a participant that has been set up
    * @param eventId - the title of the game
    * @param userId - the id of the user wishing to register
    * @returns - the requested participant information
    * @async - an asynchronous method
    */
    async save() {
        const { rows } = await db.query(`INSERT INTO event_has_participant ("event_id", "user_id") VALUES ($1, $2) RETURNING *;`, [this.eventId, this.userId]);
        this.id = rows[0].id;
        this.inscriptionDate = rows[0].inscription_date;
    }

    /**
    * Method to go and update the cancelled_date line for a participant
    * @param cancelledDate - the date of cancellation of participation
    * @returns - the information of the requested participant
    * @async - an asynchronous method
    */
    async update() {
        await db.query('UPDATE event_has_participant SET cancelled_date = $1 WHERE id = $2;', [this.cancelledDate, this.id]);
    }
}

module.exports = Participant;