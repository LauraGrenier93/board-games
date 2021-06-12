import {
  SET_ARTICLES,
  SET_FIELD_VALUE_ARTICLE,
  SET_ADD_NEW_ARTICLE,
  ID_ARTICLE_SELECTED,
  SET_EDIT_ARTICLE,
  SET_DELETE_ARTICLE,
  EDIT_NEW_DESCRIPTION,
  EDIT_NEW_TITLE,
  INIT_VALUE_NEW_AND_DELETE_ARTICLE,
} from 'src/actions/articles';
import {
  SET_LOADING,
} from 'src/actions/user';

export const initialState = {
  articles: [
    {
      id: 1,
      title: '',
      description: '',
      createdDate: '',
      updateDate: null,
      authorId: 2,
      authorPseudo: '',
      tagId: 1,
      tagName: '',
      preview: '',
    },
  ],
  editArticle: false,
  deleteArticle: false,
  newArticle: false,
  loadingArticles: true,
  newTitle: '',
  newDescription: '',
  newTagId: '',
  newArticleDate: '',
  idArticle: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    case SET_FIELD_VALUE_ARTICLE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_ADD_NEW_ARTICLE:
      return {
        ...state,
        newArticle: action.boolean,
      };
    case ID_ARTICLE_SELECTED:
      return {
        ...state,
        idArticle: action.id,

      };
    case SET_EDIT_ARTICLE:
      return {
        ...state,
        editArticle: action.boolean,
      };
    case EDIT_NEW_DESCRIPTION:
      return {
        ...state,
        newDescription: action.description,
      };
    case EDIT_NEW_TITLE:
      return {
        ...state,
        newTitle: action.title,
      };
    case SET_DELETE_ARTICLE:
      return {
        ...state,
        deleteArticle: action.boolean,
      };
    case INIT_VALUE_NEW_AND_DELETE_ARTICLE:
      return {
        ...state,
        deleteArticle: false,
        newArticle: false,
        editArticle: false,
        newTitle: '',
        newDescription: '',
        newTagId: '1',
        newArticleDate: '',
      };
    case SET_LOADING:
      return {
        ...state,
        [action.name]: action.boolean,
      };
    default:
      return state;
  }
};
