import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

const CardGame = ({
  title,
  minAge,
  duration,
  quantity,
  preview,
  minPlayer,
  maxPlayer,
  gameType,
  gameCategories,
  id,
}) => (
  <Card fluid className="card games" as={Link} to={`/jeux/${id}`}>
    <Card.Content textAlign="center" className="card__content">
      <Card.Header>{title} <span className="game-type">{gameType}</span></Card.Header>
      <div className="tag-container">
        {gameCategories.map((tag) => (
          <Card.Header className="tag" key={tag.toString()}>
            <p>{tag}</p>
          </Card.Header>
        ))}
      </div>
      <Card.Meta>
        <p className="info">
          <span className="oneInfo">nombre de joueur: {minPlayer}-{maxPlayer}</span>
          <span className="oneInfo">age minimum: {minAge} ans</span>
          <span className="oneInfo">quantité disponible: {quantity}</span>
          <span className="oneInfo">durée: {duration.hours} heure(s) {duration.minutes} minute(s)</span>
        </p>
      </Card.Meta>
      <Card.Description>
        {preview}...
      </Card.Description>
    </Card.Content>
  </Card>
);
CardGame.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  gameType: PropTypes.string.isRequired,
  minAge: PropTypes.number.isRequired,
  duration: PropTypes.objectOf(PropTypes.number).isRequired,
  quantity: PropTypes.number.isRequired,
  minPlayer: PropTypes.number.isRequired,
  maxPlayer: PropTypes.number.isRequired,
  gameCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CardGame;
