import React from 'react';
import {  Card, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

const CardEvent = ({
  title,
  description,
  eventDate,
  createdDate,
  updateDate,
  eventTag,
  creatorPseudo,
  id,
}) => {
     /**
 * function that starts a timer to initialise the message after 20 seconds
 */
      if(message){
        setTimeout(() => {
          setMessage('', 'message')
        }, 20000);
      }
  return (
    <>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {(loadingEvents)?
        <Loader active inline="centered" />
       :(<>
      <Card className="cardEvent" as={Link} to={`/evenements/${id}`} style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)' }}>
        <Card.Content textAlign="center">
          <Card.Header>{ eventTag}</Card.Header>
          <Card.Header>{title} pour la date du {eventDate}</Card.Header>
          <Card.Meta>
            <span>{creatorPseudo}</span>
            <span>mise en ligne le { updateDate || createdDate }</span>
          </Card.Meta>
          <Card.Description>
            {description}
          </Card.Description>
        </Card.Content>
      </Card>
    </>
        )}
        </>
  );
};
CardEvent.propTypes = {
  id:PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventDate: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  updateDate: PropTypes.string,
  eventTag: PropTypes.string.isRequired,
  creatorPseudo: PropTypes.string.isRequired,
};

export default CardEvent;
