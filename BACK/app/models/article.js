const db = require('../database');

class Article {
  id;
  title;
  description;
  createdDate;
  updateDate;
  authorId;
  authorPseudo;
  authorAvatar;
  tagId;
  tagName;

  set created_date(val) {
    this.createdDate = val;
  }

  set update_date(val) {
    this.updateDate = val;
  }

  set author_id(val) {
    this.authorId = val;
  }

  set author_avatar(val) {
    this.authorAvatar = val;
  }

  set author_pseudo(val) {
    this.authorPseudo = val;
  }

  set tag_id(val) {
    this.tagId = val;
  }

  set tag_name(val) {
    this.tagName = val;
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
  * Method of fetching all the information on all the articles
  * @returns - all items in the DB
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findAll() {
    const { rows } = await db.query('SELECT * FROM complete_articles ORDER BY id DESC;');

    if (!rows[0]) {
      console.log(Error);
      throw new Error("Le site n'a pas encore d'article");

    }

    return rows.map(article => new Article(article));
  }
  /**
  * Method for fetching information about a parameterised item
  * @param id - the id of an article
  * @returns - the information in the article requested
  * @static - a static method
  * @async - an asynchronous method
  */
  static async findOne(id) {
    const { rows } = await db.query('SELECT * FROM complete_articles WHERE id=$1;', [id]);

    if (!rows[0]) {
      throw new Error(`L'article avec l'id ${id} n'existe pas`);
    }

    return new Article(rows[0]);
  }

  /**
  * Method responsible for inserting information relating to an article passed in parameters
  * @param  title - the title of the article
  * @param  description - the content of the article
  * @param  authorId - the author's id
  * @param  tagId - the id of the article's tag
  * @returns - the user information requested
  * @async - an asynchronous method
  */
  async save() {
    const { rows } = await db.query('SELECT * FROM new_article($1, $2, $3, $4);', [this.title, this.description, this.authorId, this.tagId]);
    this.id = rows[0].id;
    this.createdDate = rows[0].created_date;
  }

  /**
  * Method responsible for updating the information on an item passed in parameters
  * @param id - the id of the article
  * @param title - the title of the article
  * @param description - the content of the article
  * @param authorId - the author's id
  * @param tagId - the id of the article's tag
  * @returns - updated user information
  * @async - an asynchronous method
  */
  async update() {
    await db.query('SELECT * FROM update_article($1, $2, $3, $4, $5);', [this.id, this.title, this.description, this.authorId, this.tagId]);
  }
  /**
  * Method for deleting an article passed in parameters
  * @param id - the id of an article
  * @async - an asynchronous method
  */
  async delete() {
    await db.query('DELETE FROM article WHERE id = $1;', [this.id]);
  }
}

module.exports = Article;
