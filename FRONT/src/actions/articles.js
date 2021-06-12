// Types of action
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const SET_ARTICLES = 'SET_ARTICLES';
export const SEND_ADD_ARTICLE = 'SEND_ADD_ARTICLE';
export const SET_FIELD_VALUE_ARTICLE = 'SET_FIELD_VALUE_ARTICLE';
export const SET_ADD_NEW_ARTICLE = 'SET_ADD_NEW_ARTICLE';
export const ID_ARTICLE_SELECTED = 'ID_ARTICLE_SELECTED';
export const SEND_EDIT_ARTICLE = 'SEND_EDIT_ARTICLE';
export const SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE';
export const EDIT_NEW_TITLE = 'EDIT_NEW_TITLE';
export const EDIT_NEW_DESCRIPTION = 'EDIT_NEW_DESCRIPTION';
export const SEND_DELETE_ARTICLE = 'SEND_DELETE_ARTICLE';
export const SET_DELETE_ARTICLE = 'SET_DELETE_ARTICLE';
export const INIT_VALUE_NEW_AND_DELETE_ARTICLE = 'INIT_VALUE_NEW_AND_DELETE_ARTICLE';

// creation of an action

/**
 *  action that fetches articles from the database
 */
export const fetchArticles = () => ({
  type: FETCH_ARTICLES,
});

/**
 *  action that allows the display of articles
 * @param {object} articles
 */
export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  articles,
});

/**
 *  action that sends a new article to the database
 */
export const sendAddArticle = () => ({
  type: SEND_ADD_ARTICLE,
});

/**
 *  action that changes the value of the boolean
 *  in the store to display all items plus the one created
 * @param {bool} boolean
 * @returns
 */
export const setAddNewArticle = (boolean) => ({
  type: SET_ADD_NEW_ARTICLE,
  boolean,
});

/**
 *  action allowing to update the value of a field in the store
 * @param {String} value
 * @param {String} name
 */
export const setFieldValueArticle = (value, name) => ({
  type: SET_FIELD_VALUE_ARTICLE,
  value,
  name,
});

/**
 *  action that indicates and stores the id number of the event to modify it
 */
export const idArticleSelected = (id) => ({
  type: ID_ARTICLE_SELECTED,
  id,
});
/**
 *  action that sends an article modification to the database
 */
export const sendEditArticle = () => ({
  type: SEND_EDIT_ARTICLE,
});

/**
 *  action which, when an article is modified, will trigger its display
 */
export const setEditArticle = (boolean) => ({
  type: SET_EDIT_ARTICLE,
  boolean,
});

/**
 *  action that displays the title in preview if it has not been modified
 * @param {string} title
 */
export const editNewTitle = (title) => ({
  type: EDIT_NEW_TITLE,
  title,
});

/**
 *  action that displays the description in preview if it has not been modified
 * @param {string} description
 */
export const editDescription = (description) => ({
  type: EDIT_NEW_DESCRIPTION,
  description,
});

/**
 * action to delete an item
 */
export const sendDeleteArticle = () => ({
  type: SEND_DELETE_ARTICLE,
});

/**
 *  action which, when an article is modified, will trigger its display
 */
export const setDeleteArticle = (boolean) => ({
  type: SET_DELETE_ARTICLE,
  boolean,
});
/**
 * Action to register or unregister for an event
 */
export const initValueNewAndDeleteArticle = () => ({
  type: INIT_VALUE_NEW_AND_DELETE_ARTICLE,
});
