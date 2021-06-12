/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import OneGame from 'src/components/OneGame';
import { setMessage } from 'src/actions/user';
import { fetchGames } from 'src/actions/games';
import { fetchEvents } from 'src/actions/events';
import { fetchArticles } from 'src/actions/articles';

const mapStateToProps = (state) => ({
  error: state.user.error,
  message: state.user.message,
  loadingGames: state.games.loadingGames,
  errorGames: state.user.errorGames,
});

const mapDispatchToProps = (dispatch) => ({
  setMessage: (message, name) => dispatch(setMessage(message, name)),
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
});
export default connect(mapStateToProps, mapDispatchToProps)(OneGame);
