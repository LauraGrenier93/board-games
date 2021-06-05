import { connect } from 'react-redux';
import AddArticle from 'src/components/AddArticle';
import { sendAddArticle, setFieldValueArticle } from 'src/actions/articles';
import { setError } from 'src/actions/user';

const mapStateToProps = (state) => (
  {
    newTitle: state.articles.newTitle,
    newDescription: state.articles.newDescription,
    newArticle: state.articles.newArticle,
    newTagId: state.articles.newTagId,
    errornewTagId: state.user.errornewTagId,
    errornewTitle: state.user.errornewTitle,
    errornewDescription: state.user.errornewDescription,
    errorAddArticle: state.user.errorAddArticle,
    error: state.user.error,
    pseudo: state.user.pseudo,
  });
const mapDispatchToProps = (dispatch) => ({
  changeFieldArticle: (value, name) => dispatch(setFieldValueArticle(value, name)),
  handleAddArticle: () => dispatch(sendAddArticle()),
  handleBlur: (error, name) => dispatch(setError(error, name)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
