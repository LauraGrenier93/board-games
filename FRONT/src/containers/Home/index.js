import { connect } from 'react-redux';
import Home from 'src/components/Home';
import { fetchArticles, initValueNewAndDeleteArticle } from 'src/actions/articles'; 
import { setMessage } from 'src/actions/user'; 

const mapStateToProps = (state) => ({
    articles: state.articles.articles,
    games: state.games.games,
    events: state.events.events,
    addNewArticle: state.articles.newArticle,
    deleteArticle: state.articles.deleteArticle,
    isLogged: state.user.logged,
    messageHome: state.user.messageHome,
    errorArticles: state.user.errorArticles,
    errorGames: state.user.errorGames,
    errorEvents: state.user.errorEvents,
    error: state.user.error,
    message:state.user.message,
    loadingEvents: state.events.loadingEvents,
    loadingGames: state.games.loadingGames,
    loadingArticles: state.articles.loadingArticles,
  });

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchArticles()),
  setMessage:(message, name)=> dispatch(setMessage(message, name)),
  initValueNewAndDeleteArticle: () => dispatch(initValueNewAndDeleteArticle()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
