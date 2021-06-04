const db = require('../database')

class Game {
  id;
  title;
  minPlayer;
  maxPlayer;
  minAge;
  duration;
  quantity;
  purchasedDate;
  creator;
  editor;
  description;
  year;
  typeId;
  gameType;
  gameCategories;
  tagHasGameId;

  set min_player(val) {
    this.minPlayer = val;
  }

  set max_player(val) {
    this.maxPlayer = val;
  }

  set min_age(val) {
    this.minAge = val;
  }

  set purchased_date(val) {
    this.purchasedDate = val;
  }

  set type_id(val) {
    this.typeId = val;
  }

  set game_type(val) {
    this.gameType = val;
  }

  set game_categories(val) {
    this.gameCategories = val;
  }

  set tag_has_game_id(val) {
    this.tagHasGameId = val;
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
  * Method of fetching all the information about all the games
  * @returns - all the games in the BDD
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM complete_games');

    if (!rows[0]) {
      throw new Error("Il n'y a pas encore de jeux pour ce club ...");
    }

    return rows.map(game => new Game(game));
  }
  /**
  * Method for retrieving information about a game that has been set up
  * @param id - an id of a game
  * @returns - the game information requested
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findOne(id) {
    const { rows } = await db.query('SELECT * FROM complete_games WHERE id=$1;', [id]);

    if (!rows[0]) {
      throw new Error(`Le jeu avec l'id ${id} n'existe pas`);
    }

    return new Game(rows[0]);
  }

  /**
  * Method responsible for inserting information relating to a game passed in parameters
  * @param title - the title of the game
  * @param minPlayer - the minimum number of players required to play the game
  * @param maxPlayer - the maximum number of players to play the game
  * @param minAge - the minimum age for playing the game
  * @param duration - the average length of a game
  * @param quantity - the number of copies of the game we have
  * @param creator - the name of the game's creator
  * @param editor - the name of the game's publisher
  * @param description - the game description
  * @param year - the year the game was released
  * @param typeId - the type id (base game or DLC) of the game
  * @param gameCategories - the names of the categories associated with the game
  * @returns - the requested game information
  * @async - an asynchronous method
  */
  async save() {
    const { rows } = await db.query(`SELECT * FROM new_game(
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
    );`, [
      this.title,
      this.minPlayer,
      this.maxPlayer,
      this.minAge,
      this.duration,
      this.quantity,
      this.creator,
      this.editor,
      this.description,
      this.year,
      this.typeId
    ]);

    this.id = rows[0].id;
    this.purchasedDate = rows[0].purchased_date;

    if (this.gameCategories) {
      const query = `INSERT INTO tag_has_game (game_id, tag_id)
      SELECT $1, id
      FROM game_tag WHERE name = $2
      RETURNING *;`;
      this.tagHasGameId = [];
      if (typeof gameCategories === "object") {
        for (const category of this.gameCategories) {
          const { rows } = await db.query(query, [this.id, category])
          this.tagHasGameId.push(rows[0].id);
        }
      } else {
        const { rows } = await db.query(query, [this.id, this.gameCategories]);
        this.tagHasGameId.push(rows[0].id);
      }
    }
  }

  /**
  * Method responsible for updating information about a game passed in parameters
  * @param id - the game id
  * @param title - the title of the game
  * @param minPlayer - the minimum number of players required to play the game
  * @param maxPlayer - the maximum number of players to play the game
  * @param minAge - the minimum age for playing the game
  * @param duration - the average length of a game
  * @param quantity - the number of copies of the game we have
  * @param creator - the name of the game's creator
  * @param editor - the name of the game's publisher
  * @param description - the game description
  * @param year - the year the game was released
  * @param typeId - the type id (base game or DLC) of the game
  * @param gameCategories - the names of the categories associated with the game
  * @returns - updated game information
  * @async - an asynchronous method
  */
  async update() {
    await db.query('SELECT * FROM update_game($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);',
      [
        this.id,
        this.title,
        this.minPlayer,
        this.maxPlayer,
        this.minAge,
        this.duration,
        this.quantity,
        this.creator,
        this.editor,
        this.description,
        this.year,
        this.typeId
      ]);

    for (const tagHasGameId of this.tagHasGameId) {
      for (const category of this.gameCategories) {
        await db.query('UPDATE tag_has_game SET tag_id = game_tag.id FROM (SELECT id FROM game_tag WHERE name = $1) AS game_tag WHERE tag_has_game.id=$2;', [category, tagHasGameId]);
      }
    }
  }
  /**
  * Method in charge of deleting a game passed in parameters
  * @param - an id of a game
  * @async - an asynchronous method
  */
  async delete() {
    await db.query('DELETE FROM game WHERE id = $1;', [this.id]);
    await db.query('DELETE FROM tag_has_game WHERE game_id = $1;', [this.id]);
  }
}

module.exports = Game;
