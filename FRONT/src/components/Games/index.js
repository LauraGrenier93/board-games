/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import ContentGames from 'src/components/Games/ContentGames';

const Games = ({
  games,
  error,
  message,
  setMessage,
  loadingGames,
  errorGames,
}) => {
  /**
   * function that starts a timer to initialise the message after 20 seconds
   */
  if (message) {
    setTimeout(() => {
      setMessage('', 'message');
    }, 60000);
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {(loadingGames)
        ? <Loader active inline="centered" />
        : (
          <>
            {errorGames
              ? <p className="error">{errorGames}</p>
              : (
                <ContentGames elements={games} />
              )}
          </>
        )}
    </>
  );
};
Games.propTypes = {
  games: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  errorGames: PropTypes.string.isRequired,
  loadingGames: PropTypes.bool.isRequired,
};

export default Games;
