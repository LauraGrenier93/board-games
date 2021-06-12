/* eslint-disable linebreak-style */
import { connect } from 'react-redux';
import Games from 'src/components/Games';
import { setMessage } from 'src/actions/user';

const mapStateToProps = (state) => (
  {
    games: state.games.games,
    error: state.user.error,
    message: state.user.message,
    loadingGames: state.games.loadingGames,
    errorGames: state.user.errorGames,
  });
const mapDispatchToProps = (dispatch) => ({
  setMessage: (message, name) => dispatch(setMessage(message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
