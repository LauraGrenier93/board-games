import { connect } from 'react-redux';
import App from 'src/components/App';
import { fetchArticles } from 'src/actions/articles';
import { fetchGames } from 'src/actions/games';
import { fetchEvents } from 'src/actions/events';

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  games: state.games.games,
  events: state.events.events,
  isLogged: state.user.logged,
  addNewEvent: state.events.newEvent,
});

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
