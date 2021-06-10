const db = require('../database');

class User {

  id;
  firstName;
  lastName;
  pseudo;
  emailAddress;
  password;
  inscription;
  avatar;

  set first_name(val) {
    this.firstName = val;
  }

  set last_name(val) {
    this.lastName = val;
  }

  set email_address(val) {
    this.emailAddress = val;
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
* Method of fetching all information for all users
* @returns - all users in the DB
* @static - a static method
* @async - an asynchronous method
*/
  static async findAll() {
    const {
      rows
    } = await db.query('SELECT * FROM "user" ;');

    if (!rows[0]) {
      throw new Error("Aucun user dans la BDD");
    }
    console.log(
      `les informations des ${rows.length} users a été demandé !`
    );

    return rows.map((user) => new User(user));
  }


/**
* Method responsible for fetching the information related to a user passed in parameters
* @param - a user id
* @returns - the user information requested
* @static - a static method
* @async - an asynchronous method
*/
  static async findOne(id) {


    const {
      rows,
    } = await db.query(
      'SELECT * FROM "user" WHERE id = $1;',
      [id]
    );

    if (!rows[0]) {
      throw new Error("Aucun user avec cet id");
    }

    console.log(
      `l'user id : ${id} a été demandé !`
    );

    return new User(rows[0]);
  }



/**
* Method responsible for fetching the information related to a user passed in parameters
* @param - a user's nickname
* @returns - the user information requested
* @static - a static method
* @async - an asynchronous method
*/
  static async findByPseudo(pseudo) {

    const {
      rows,
    } = await db.query(
      `SELECT "user".*, "group".name group_name FROM "user" 
            JOIN "group" ON "group".id="user".group_id
            WHERE "user".pseudo= $1;`,
      [pseudo]
    );

    if (!rows[0]) {
      console.log("Aucun user avec ce pseudo");
    } else {
      console.log(
        `l'user avec le pseudo : ${pseudo} a été demandé !`
      );
    }


    return new User(rows[0]);
  }

/**
* Method responsible for fetching the information related to a user passed in parameters
* @param - an email from a user
* @returns - the user information requested
* @static - a static method
* @async - an asynchronous method
*/
  static async findByEmail(email) {

    const {
      rows,
    } = await db.query(
      'SELECT * FROM "user" WHERE "user".email_address= $1;',
      [email]
    );

    if (!rows[0]) {
      console.log("Cet email n'est pas enregistré dans la BDD.");
    } else(console.log(
      ` l'email : ${email} existe déja en BDD !`
    ))

    return new User(rows[0]);
  }
/**
* Method in charge of inserting the information relative to a user passed in parameters
* @param  firstName - the firstname of a user
* @param  lastName -  the lastname of a user
* @param  pseudo - a user's nickname
* @param  emailAddress - the emailAddress of a user
* @param  password - the password of a user
* @returns - the user information requested
* @async - an asynchronous method
*/
  async save() {
    const {
      rows,
    } = await db.query(
      `INSERT INTO "user" (first_name, last_name, pseudo, email_address, password) VALUES ($1,$2,$3,$4,$5) RETURNING *;`,
      [this.firstName, this.lastName, this.pseudo, this.emailAddress, this.password]
    );
    
    this.id = rows[0].id;
    this.inscription = rows[0].inscription;
    console.log(
      `l'user ${this.id} avec comme nom ${this.firstName} ${this.lastName} a été inséré à la date du ${this.inscription} !`
    );
  }
/**
* method that modifies the information about the user passed in parameter
* @param  firstName - the firstname of a user
* @param  lastName -  the lastname of a user
* @param  pseudo - a user's nickname
* @param  emailAddress - the emailAddress of a user
* @param  password - the password of a user
  @param  id - a user id
  @param  avatar - a pictur of user
* @returns - the user information requested
* @async - an asynchronous method
*/
  async update() {
    const {
      rows,
    } = await db.query(
      `UPDATE "user" SET  first_name= $1, last_name = $2, pseudo= $3, email_address= $4, password= $5, avatar= $6 WHERE id = $7 RETURNING *;`,
      [
        this.firstName,
        this.lastName,
        this.pseudo,
        this.emailAddress,
        this.password,
        this.avatar,
        this.id,
      ]
    );

    this.id = rows[0].id;
    console.log(
      `l'user id : ${this.id} avec comme nom ${this.firstName} ${this.lastName} a été mise à jour !`
    );
  }

  static async delete(id) {
    const {
      rows
    } = await db.query('DELETE FROM "user" WHERE id = $1 RETURNING *;', [
      id,
    ]);
    console.log(`l'user ${id} a été supprimé !`);

    return new User(rows[0]);
  }

}
module.exports = User;
