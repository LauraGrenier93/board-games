import { connect } from 'react-redux';
import Games from 'src/components/Games';
import { setMessage } from 'src/actions/user'; 

const mapStateToProps = (state) => (
  {
    games: state.games.games,
    error: state.user.error,
    message: state.user.message,
  });
  const mapDispatchToProps = (dispatch) => ({
    setMessage:(message, name)=> dispatch(setMessage(message, name)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Games);
