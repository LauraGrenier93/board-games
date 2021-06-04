import { connect } from 'react-redux';
import OneEvent from 'src/components/OneEvent';
import {participation, fetchEvents, idEventSelected,sendUnsubscribe } from 'src/actions/events';
import { setMessage } from 'src/actions/user'; 
import { fetchGames } from 'src/actions/games';
import { fetchArticles } from 'src/actions/articles';

const mapStateToProps = (state) => (
  {
    toParticipate:state.events.toParticipate,
    isLogged:state.user.logged,
    error: state.user.error,
    message: state.user.message,
    loadingEvents: state.events.loadingEvents,
    errorEvents:state.user.errorEvents,
  });
const mapDispatchToProps = (dispatch) => ({
  participation: () => dispatch(participation()),
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
  idEventSelected: (id) => dispatch(idEventSelected(id)),
  unsubscribe: () => dispatch(sendUnsubscribe()),
  setMessage:(message, name)=> dispatch(setMessage(message, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneEvent);
