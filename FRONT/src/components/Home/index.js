/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button, Loader,
} from 'semantic-ui-react';

import ContentArticles from 'src/components/Articles/ContentArticles';
import { lastArray, randomArray } from 'src/selectors';
import ContentEvents from 'src/components/Events/ContentEvents';
import ContentGames from 'src/components/Games/ContentGames';

const Home = ({
  loadingEvents,
  loadingGames,
  loadingArticles,
  events,
  articles,
  games,
  fetchArticles,
  isLogged,
  addNewArticle,
  deleteArticle,
  initValueNewAndDeleteArticle,
  messageHome,
  message,
  setMessage,
  errorArticles,
  errorEvents,
  errorGames,
  error,
}) => {
  /**
   * function that is triggered each time an article is added,
   * fetchArticle will search the database for all articles
   */
  useEffect(async () => {
    await fetchArticles();
    initValueNewAndDeleteArticle();
  }, [addNewArticle, deleteArticle]);

  /**
   * function that starts a timer to initialise the message after 20 seconds
   */
  if (messageHome) {
    setTimeout(() => {
      setMessage('', 'messageHome');
    }, 20000);
  }
  /**
   * function that starts a timer to initialise the message after 20 seconds
   */
  if (message) {
    setTimeout(() => {
      setMessage('', 'message');
    }, 60000);
  }
  return (
    <div className="home">
      {messageHome && <p className="success">{messageHome}</p>}
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <h2> Notre dernier Evènement</h2>
      {(loadingEvents)
        ? <Loader active inline="centered" />
        : (
          <>
            {errorEvents
              ? <p className="error">{errorEvents}</p>
              : <ContentEvents elements={lastArray(events)} />}
          </>
        )}
      <h2> Nos jeux</h2>
      {(loadingGames)
        ? <Loader active inline="centered" />
        : (
          <>
            {errorGames
              ? <p className="error">{errorGames}</p>
              : <ContentGames elements={randomArray(games)} />}
          </>
        )}
      <h2> Nos articles </h2>
      {(loadingArticles)
        ? <Loader active inline="centered" />
        : (
          <>
            {isLogged && (
            <Link to="/ajoutArticle">
              <Button content="Ajouter un article" labelPosition="left" icon="edit" />
            </Link>
            )}
            {errorArticles
              ? <p className="error">{errorArticles}</p>
              : (<ContentArticles elements={articles} />)}
          </>
        )}
    </div>
  );
};
Home.propTypes = {
  events: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  isLogged: PropTypes.bool.isRequired,
  addNewArticle: PropTypes.bool.isRequired,
  deleteArticle: PropTypes.bool.isRequired,
  loadingEvents: PropTypes.bool.isRequired,
  loadingGames: PropTypes.bool.isRequired,
  loadingArticles: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  initValueNewAndDeleteArticle: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageHome: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errorArticles: PropTypes.string.isRequired,
  errorEvents: PropTypes.string.isRequired,
  errorGames: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
};

export default Home;
