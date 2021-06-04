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
        store.dispatch(setError('Nous avons eu un problème technique pour afficher les articles.', 'errorArticles'));
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
        store.dispatch(setError('Nous avons eu un problème technique pour ajouter l\'articles.'));
        console.log('error', error);
        console.log('error.response.data', error.response);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
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
        console.log('error', error);
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
        store.dispatch(setError('Nous avons eu un problème technique pour modifier l\'articles.'));
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
        store.dispatch(setError('Nous avons eu un problème technique pour supprimer l\'article.'));
        console.log('error', error);
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
