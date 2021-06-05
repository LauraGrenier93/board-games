/* eslint-disable no-empty */
import {
  FETCH_ARTICLES, SEND_ADD_ARTICLE,   SEND_EDIT_ARTICLE,SEND_DELETE_ARTICLE,setArticles, setAddNewArticle, setEditArticle, setDeleteArticle,
} from 'src/actions/articles';
import { setError, setMessage,setLoading } from 'src/actions/user';
import axios from 'src/api'; 

export default (store) => (next) => async (action) => {
  const { user: { idUser } } = store.getState();
  const {
    articles: {
      newTitle, newDescription, newTagId,idArticle,
    },
  } = store.getState();

  const numberId = parseInt(idUser, 10);
  const newTagIdNumber = parseInt(newTagId, 10);
  
  const urlEditArticle = `/articles/${idArticle}`;
  const urlDeleteArticle = `/articles/${idArticle}`;

  switch (action.type) {

    case FETCH_ARTICLES: {
      try {
        const response = await axios.get('articles');
        store.dispatch(setArticles(response.data));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu afficher les articles.', 'errorArticles'));
      }
      finally{
        store.dispatch(setLoading(false, 'loadingArticles'));
        return next(action);
      }
    }

    case SEND_ADD_ARTICLE: {
      try {
        const tokens = localStorage.getItem('tokens');
        
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };

        await axios.post('/articles', {
          title: newTitle,
          description: newDescription,
          authorId: numberId,
          tagId: newTagIdNumber,
        }, options);

        store.dispatch(setAddNewArticle(true));
      }
      catch (error) {
        if(error.response.data === '"title" is not allowed to be empty'){
          store.dispatch(setError('Le champs titre de l\'article ne peut être vide.', 'errorAddArticle'));
        }
        else if(error.response.data ==='"description" is not allowed to be empty'){
          store.dispatch(setError('Le champs description de l\'article ne peut être vide.', 'errorAddArticle'));
        }
        else if(error.response.data ==='"description" length must be at least 15 characters long'){
          store.dispatch(setError('La description de l\'article doit contenir au moins 15 caractères.', 'errorAddArticle'));
        }
        else {
          store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu ajouter l\'articles.', 'errorAddArticle'));
        }
      }
      return next(action);
    }
    case SEND_EDIT_ARTICLE: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.patch(urlEditArticle, {
          title: newTitle,
          description: newDescription,
          authorId: numberId,
          tagId: newTagIdNumber,
        }, options);
        store.dispatch(setEditArticle(true));
      }
      catch (error) {
        if(error.response.data === '"title" is not allowed to be empty'){
          store.dispatch(setError('Le champs titre de l\'article ne peut être vide. Votre article n\'a pas pu être enregistré', 'errorEditArticle'));
        }
        else if(error.response.data ==='"description" is not allowed to be empty'){
          store.dispatch(setError('Le champs description de l\'article ne peut être vide.', 'errorEditArticle'));
        }
        else if(error.response.data ==='"description" length must be at least 15 characters long'){
          store.dispatch(setError('La description de l\'article doit contenir au moins 15 caractères.', 'errorEditArticle'));
        }
        else {
          store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu  modifier l\'articles.', 'errorEditArticle'));
        }
      }
      return next(action);
    }
    case SEND_DELETE_ARTICLE: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.delete(urlDeleteArticle, options);
        store.dispatch(setDeleteArticle(true));
        store.dispatch(setMessage('Votre article a bien été supprimé'));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu supprimer l\'article.', 'errorDeleteArticle'));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
