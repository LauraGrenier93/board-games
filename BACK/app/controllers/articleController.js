const Article = require('../models/article');
const { formatForArticle } = require('../services/date');
const getPreview = require('../services/preview');

const articleController = {
  /**
  * Method for retrieving information on all items
  * @param {Express.Response} res - the object representing the response
  * @return {Object}  - Articles as JSON objects
  */
  allArticles: async (_, res) => {
    try {
      const articles = await Article.findAll();
      const articlesFormat = articles.map(article => {
        article.createdDate = formatForArticle(article.createdDate);
        if (article.updateDate) {
          article.updateDate = formatForArticle(article.updateDate);
        }
        return article;
      });
      getPreview(articlesFormat);
      console.log(articlesFormat);
      res.json(articlesFormat);
    } catch (error) {
      console.log(error.message);
      res.status(404).json(error.message);
    }
  },
  /**
  * Method for retrieving information about an article
  * @property {int} id - the id of the item searched
  * @param {Express.Request} req - the object representing the request
  * @param {Express.Response} res - the object representing the response
  * @return {Object}  -  The article as a JSON object
  */
  oneArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne(id)
      article.createdDate = formatForArticle(article.createdDate);
      if (article.updateDate) {
        article.updateDate = formatForArticle(article.updateDate);
      }
      console.log(article);
      res.json(article);
    } catch (error) {
      console.log(error.message)
      res.status(404).json(error.message);
    }
  },
  /**
 * A method that supports the creation of a new item in the DB
 * @name newArticle
 * @property {string} title - Title of the new article
 * @property {string} description - the content of the new article
 * @property {int} authorId - the author's id
 * @property {int} tagId - the id of the article's tag
 * @param {Express.Request} request - the object representing the request
 * @param {Express.Response} response - the object representing the response
 * @return {Object}  - The new article as a JSON object
 */
  newArticle: async (req, res) => {
    try {
      const data = {};
      data.title = req.sanitize(req.body.title);
      data.description = req.sanitize(req.body.description);
      data.authorId = req.sanitize(req.body.authorId);
      data.tagId = req.sanitize(req.body.tagId);
      const newArticle = new Article(data);
      await newArticle.save();
      res.json(newArticle);
    } catch (error) {
      console.log(`Erreur lors de l'enregistrement de l'article: ${error.message}`);
      res.status(500).json(error.message);
    }
  },
  /**
* A method that supports the updating of an article in the DB
* @name updateArticle
* @property {int} id - the id of the item searched
* @property {string} title - The title of the new article
* @property {string} description - the content of the new article
* @property {int} authorId - the author's id
* @property {int} tagId - the id of the article's tag
* @param {Express.Request} request - the object representing the request
* @param {Express.Response} response - the object representing the response
* @return {Object}  -  The article updated as a JSON object
*/
  updateArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne(id);

      const newData = {};
      newData.title = req.sanitize(req.body.title);
      newData.description = req.sanitize(req.body.description);
      newData.authorId = req.sanitize(req.body.authorId);
      newData.tagId = req.sanitize(req.body.tagId);

      if (newData.title) {
        article.title = newData.title;
      }

      if (newData.description) {
        article.description = newData.description;
      }

      if (newData.authorId) {
        article.authorId = newData.authorId;
      }

      if (newData.tagId) {
        article.tagId = newData.tagId;
      }

      await article.update();
      res.json(article);
    } catch (error) {
      console.log(`Erreur lors de la mise à jour de l'article: ${error.message}`);
      res.status(500).json(error.message);
    }
  },
  /**
  * Method for deleting an article
  * @property {int} id - the id of the item searched
  * @param {Express.Request} req - the object representing the request
  * @param {Express.Response} res - the object representing the response
  * @return {String}  - A JSON string confirming the deletion
  */
  deleteArticle: async (req, res) => {
    try {
      const { id } = req.params;
      const article = await Article.findOne(id);
      await article.delete();
      res.json(`L'article avec l'${id} a été supprimé`);
    } catch (error) {
      console.log(`Erreur lors de la supression de l'article: ${error.message}`);
      res.status(500).json(error.message);
    }
  }

};

module.exports = articleController;
