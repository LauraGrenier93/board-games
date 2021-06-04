const db = require('../database');

class Event {
  id;
  title;
  description;
  eventDate;
  createdDate;
  updateDate;
  creatorId;
  tagId;
  eventTag;
  creatorPseudo;
  eventParticipants;
  eventGames;
  eventHasGameId;

  set event_date(val) {
    this.eventDate = val;
  }

  set created_date(val) {
    this.createdDate = val;
  }

  set update_date(val) {
    this.updateDate = val;
  }

  set creator_id(val) {
    this.creatorId = val;
  }

  set tag_id(val) {
    this.tagId = val;
  }

  set event_tag(val) {
    this.eventTag = val;
  }

  set creator_pseudo(val) {
    this.creatorPseudo = val;
  }

  set event_participants(val) {
    this.eventParticipants = val;
  }

  set event_games(val) {
    this.eventGames = val;
  }

  set event_has_game_id(val) {
    this.eventHasGameId = val;
  }
  /**
   * @constructor
   */
  constructor(data = {}) {
    for (const prop in data) {
      this[prop] = data[prop];
    }
  }
  /**
  * Method of fetching all information related to all events
  * @returns - all events in the DB
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM complete_events ORDER BY id DESC;');

    if (!rows[0]) {
      throw new Error("Il n'y a pas d'évenement en BDD");
    }

    return rows.map(event => new Event(event));
  }
  /**
  * Method for fetching information related to an event passed in parameters
  * @param id - id of an event
  * @returns - the requested event information
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findOne(id) {
    const { rows } = await db.query('SELECT * FROM complete_events WHERE id=$1;', [id]);

    if (!rows[0]) {
      throw new Error(`L'événement avec l'id ${id} n'existe pas`);
    }

    return new Event(rows[0]);
  }

  /**
  * Method in charge of inserting the information relative to an event passed in parameters
  * @param title - the title of the event
  * @param description - description of the event
  * @param eventDate - the date on which the event will take place
  * @param creatorId - the id of the creator of the event
  * @param tagId - the id of the event tag
  * @param eventGames - the names of the games associated with the event
  * @returns - the requested event information
  * @async - an asynchronous method
  */
  async save() {
    const { rows } = await db.query('SELECT * FROM new_event($1, $2, $3, $4, $5);', [this.title, this.description, this.eventDate, this.creatorId, this.tagId]);
    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;

    if (this.eventGames) {
      const query = `INSERT INTO event_has_game (event_id, game_id)
      SELECT $1, id
      FROM game WHERE title = $2
      RETURNING *;`;
      this.eventHasGameId = [];
      if (typeof eventGames === "object") {
        for (const game of this.eventGames) {
          const { rows } = await db.query(query, [this.id, game]);
          this.eventHasGameId.push(rows[0].id);
        }
      } else {
        const { rows } = await db.query(query, [this.id, this.eventGames]);
        this.eventHasGameId.push(rows[0].id);
      }
    }
  }

  /**
  * Method responsible for updating the information relating to an event passed in parameters
  * @param id - the event id
  * @param title - the title of the event
  * @param description - description of the event
  * @param eventDate - the date on which the event will take place
  * @param creatorId - the id of the creator of the event
  * @param tagId - the id of the event tag
  * @param eventGames - the names of the games associated with the event
  * @returns - the requested event information
  * @async - an asynchronous method
  */
  async update() {
    await db.query('SELECT * FROM update_event($1, $2, $3, $4, $5);', [this.id, this.title, this.description, this.eventDate, this.tagId]);

    for (const eventHasGameId of this.eventHasGameId) {
      for (const game of this.eventGames) {
        await db.query('UPDATE event_has_game SET game_id = game.id FROM (SELECT id FROM game WHERE title = $1) AS game WHERE event_has_game.id=$2;', [game, eventHasGameId]);
      }
    }
  }
  /**
  * Method in charge of deleting an event passed in parameters
  * @param id - id of an event
  * @async - an asynchronous method
  */
  async delete() {
    await db.query('DELETE FROM event WHERE id = $1;', [this.id]);
    await db.query('DELETE FROM event_has_game WHERE event_id = $1;', [this.id]);
    await db.query('DELETE FROM event_has_participant WHERE event_id = $1;', [this.id]);
  }
}

module.exports = Event;
