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
    error: state.user.error,
    pseudo: state.user.pseudo,
  });
const mapDispatchToProps = (dispatch) => ({
  changeFieldArticle: (value, name) => dispatch(setFieldValueArticle(value, name)),
  handleAddArticle: () => dispatch(sendAddArticle()),
  handleBlur: (error) => dispatch(setError(error)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
