import React from 'react';
import PropTypes from 'prop-types';

import ContentGames from 'src/components/Games/ContentGames';



const Games = ({ 
  games,
  error,
  message,
  setMessage, 
}) => { 
  /**
   * function that starts a timer to initialise the message after 20 seconds
   */
       if(message){
        setTimeout(() => {
          setMessage('', 'message')
        }, 20000);
      }
  return(
  <>
    {error && <p className="error">{error}</p>}
    {message && <p className="success">{message}</p>}
    <ContentGames elements={games} />
  </>
);
  }
Games.propTypes = {
  games: PropTypes.array,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default Games;
