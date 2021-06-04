import React, {useEffect} from 'react';
import { Card,Loader } from 'semantic-ui-react'; 
import PropTypes from 'prop-types';
import './styles.css';

const OneGame = ({
  game,
  error,
  message,
  setMessage,
  loadingGames,
  errorGames,
  fetchArticles,
  fetchEvents,
  fetchGames,
}) =>{
    /**
 * function that is performed once when the page is refreh
 */
if(!game){
  useEffect(() => {
   fetchArticles();
   fetchEvents(); 
   fetchGames(); 
 }, []);
}
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
      {(loadingGames)?
        <Loader active inline="centered" />
       :(<>
        {errorGames? 
        <p className="error">{errorGames}</p> 
        :(
        <Card fluid className="card oneGames">
      <Card.Content textAlign="center" className="card__content">
      <Card.Header>{game.title} <span className="game-type">{game.gameType}</span></Card.Header>
      <div className="tag-container">
        {game.gameCategories.map((tag) => (
          <Card.Header className="tag" key={tag.toString()}>
            <p>{tag}</p>
          </Card.Header>
        ))}
      </div>
      <Card.Meta>
        <p className="aloneInfo">
          <span>nombre de joueur: {game.minPlayer}-{game.maxPlayer}</span>
          <span>age minimum: {game.minAge} ans</span>
          <span> date de sortie du jeu: {game.year}</span>
          <span className="author">éditeur: {game.editor}</span>
          <span>créateur: {game.creator}</span>
          <span className="date">date d'achat: {game.purchasedDate}</span>
          <span>quantité disponible: {game.quantity}</span>
          <span>durée: {game.duration.hours} heure(s) {game.duration.minutes} minute(s)</span>
        </p>
      </Card.Meta>
      <Card.Description>
        {game.description}
      </Card.Description>
    </Card.Content>
  </Card>
        )}
  </>
  )}
  </>
);
}
OneGame.propTypes = {
  game: PropTypes.object,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  loadingGames: PropTypes.bool.isRequired,
  errorGames: PropTypes.string.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
};
export default OneGame;
