import { connect } from 'react-redux';
import OneArticle from 'src/components/OneArticle';
import {
  setFieldValueArticle, sendEditArticle, sendDeleteArticle, idArticleSelected, editDescription, editNewTitle,fetchArticles
} from 'src/actions/articles';
import { fetchGames } from 'src/actions/games';
import { fetchEvents } from 'src/actions/events';
import {  setError } from 'src/actions/user';

const mapStateToProps = (state) => (
  {
    newTitle: state.articles.newTitle,
    newDescription: state.articles.newDescription,
    pseudo: state.user.pseudo,
    editArticle: state.articles.editArticle,
    deleteArticle: state.articles.deleteArticle,
    newTagId: state.articles.newTagId,
    error: state.user.error
  });
const mapDispatchToProps = (dispatch) => ({
  idArticleSelected: (id) => dispatch(idArticleSelected(id)),
  changeFieldArticle: (value, name) => dispatch(setFieldValueArticle(value, name)),
  sendEditArticle: () => dispatch(sendEditArticle()),
  sendDeleteArticle: () => dispatch(sendDeleteArticle()),
  editNewTitle: (title) => dispatch(editNewTitle(title)),
  editDescription: (description) => dispatch(editDescription(description)),
  setError: (error) => dispatch(setError(error)),
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneArticle);
