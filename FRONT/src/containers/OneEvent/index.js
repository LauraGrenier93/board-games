import { connect } from 'react-redux';
import OneEvent from 'src/components/OneEvent';
import {participation, fetchEvents, idEventSelected,sendUnsubscribe } from 'src/actions/events';
import { fetchGames } from 'src/actions/games';
import { fetchArticles } from 'src/actions/articles';

const mapStateToProps = (state) => (
  {
    toParticipate:state.events.toParticipate,
    isLogged:state.user.logged,
  });
const mapDispatchToProps = (dispatch) => ({
  participation: () => dispatch(participation()),
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
  idEventSelected: (id) => dispatch(idEventSelected(id)),
  unsubscribe: () => dispatch(sendUnsubscribe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneEvent);
