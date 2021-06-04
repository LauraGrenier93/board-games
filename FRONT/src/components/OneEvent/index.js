import React, { useEffect } from 'react';
import {
  Card, Button, Modal, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css';

const OneEvent = ({
  event,
  participation,
  idEventSelected,
  toParticipate,
  unsubscribe,
  isLogged,
  fetchArticles,
  fetchEvents,
  fetchGames,
}) => {
  /**
 * function that is performed once when the page is refreh
 */
if(!event){
   useEffect(() => {
    fetchArticles();
    fetchEvents(); 
    fetchGames(); 
  }, []);
}
  const [openParticipation, setOpenParticipation] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickparticipation = (evt) => {
    evt.preventDefault();
    idEventSelected(event.id);
    participation();
    setOpenParticipation(false);
  };

  const handleClickUnsubscribe = (evt) => {
    evt.preventDefault();
    console.log('je suis dans handleClickUnsubscribe');
    idEventSelected(event.id);
    unsubscribe();
    setOpen(false);
  };

  useEffect(() => {
    async function info() {
      await fetchEvents();
    }
    info();
  }, [toParticipate]);
  
  return (
    <>
      <Card className="cardEvent" as={Link} to={`/evenements/{event.id}`} style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)' }}>
        <Card.Content textAlign="center">
          <Card.Header>{ event.eventTag}</Card.Header>
          <Card.Header>{event.title} pour la date du {event.eventDate}</Card.Header>
          <Card.Meta>
            <span>{event.creatorPseudo}</span>
            <span>mise en ligne le { event.updateDate || event.createdDate }</span>
          </Card.Meta>
          <Card.Description>
            {event.description}
          </Card.Description>
          {(isLogged && toParticipate) && (
            <>
              <p className="participation">les participants sont :
                {event.eventParticipants.map((participant) => (
                  <li key={participant.toString()}>
                    {participant}
                  </li>
                ))}

              </p>

              <Modal
                id="unsubscribe"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button><Icon name="remove user" /></Button>}
              >

                <Modal.Header>désincription à l'évènement {event.title}</Modal.Header>
                <Modal.Description>
                  <p>
                    voulez-vous vous désinscrire de l'évènement {event.title}
                    pour la date du ${event.eventDate}?
                  </p>
                </Modal.Description>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>
                    Non
                  </Button>
                  <Button
                    content="Oui"
                    labelPosition="right"
                    onClick={handleClickUnsubscribe}
                  />
                </Modal.Actions>
              </Modal>
            </>
          )}
          {(isLogged && !toParticipate) && (
          <Modal
            id="participation"
            onClose={() => setOpenParticipation(false)}
            onOpen={() => setOpenParticipation(true)}
            open={openParticipation}
            trigger={<Button><Icon name="user plus" /></Button>}
          >

            <Modal.Header>Participation à l'évènement {event.title}</Modal.Header>
            <Modal.Description>
              <p>voulez-vous participer à l'évènement {event.title} pour la date du {event.eventDate}?</p>
            </Modal.Description>
            <Modal.Actions>
              <Button onClick={() => setOpenParticipation(false)}>
                Non
              </Button>
              <Button
                content="Oui"
                labelPosition="right"
                onClick={handleClickparticipation}
              />
            </Modal.Actions>
          </Modal>
          )}
        </Card.Content>
      </Card>
    </>
  );
};
OneEvent.propTypes = {
  participation: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  idEventSelected: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  toParticipate: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  event: PropTypes.object,
};

OneEvent.defaultProps = {
  event: {},
}

export default OneEvent;
