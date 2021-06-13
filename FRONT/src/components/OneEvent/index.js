/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import {
  Card, Button, Modal, Icon, Loader,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Field from 'src/components/Field';
import TextAreaDescription from 'src/components/TextAreaDescription';
import { nameTagIdEvent } from 'src/selectors';
import './styles.css';

const OneEvent = ({
  pseudo,
  event,
  changeFieldEvent,
  handleEditEvent,
  editEvent,
  deleteEvent,
  sendDeleteEvent,
  participation,
  idEventSelected,
  toParticipate,
  unsubscribe,
  isLogged,
  fetchArticles,
  fetchEvents,
  fetchGames,
  setMessage,
  loadingEvents,
  errorEvents,
  errorEditEvent,
  errornewTitle,
  errornewDescription,
  error,
  message,
  newTitle,
  newDescription,
  newEventDate,
  newTagId,
  handleBlur,
  editNewTitle,
  editDescription,
}) => {
  const errorsEditEvent = ['errornewTitle', 'errornewDescription', 'errorEditEvent'];
  const errors = [errornewTitle, errornewDescription, errorEditEvent];
  /**
 * function that is performed once when the page is displayed
 */
  useEffect(() => {
    fetchArticles();
    fetchEvents();
    fetchGames();
    if (!newTitle) {
      editNewTitle(event.title);
    }
    if (!newDescription) {
      editDescription(event.description);
    }
  }, [!event]);

  useEffect(() => {
    async function info() {
      await fetchEvents();
    }
    info();
  }, [toParticipate]);

  /**
 * function that starts a timer to initialise the message after 20 seconds
 */
  if (message) {
    setTimeout(() => {
      setMessage('', 'message');
    }, 60000);
  }

  const [openParticipation, setOpenParticipation] = React.useState(false);
  const [openUnsubscribe, setOpenUnsubscribe] = React.useState(false);
  const [openEditEvent, setOpenEditEvent] = React.useState(false);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);

  /**
     * function that is triggered when the form is submitted to delete an item
     * @param {Event} evt
     */
  const handleDeleteEventSubmit = (evt) => {
    evt.preventDefault();
    idEventSelected(event.id);
    sendDeleteEvent();
    setOpenModalDelete(false);
  };

  const handleClickparticipation = (evt) => {
    evt.preventDefault();
    idEventSelected(event.id);
    participation();
    setOpenParticipation(false);
  };

  const handleClickUnsubscribe = (evt) => {
    evt.preventDefault();
    idEventSelected(event.id);
    unsubscribe();
    setOpenUnsubscribe(false);
  };

  /**
 * function that is triggered when the form is submitted to modify an event
 * @param {Event} evt
 */
  const handleEditEventSubmit = (evt) => {
    evt.preventDefault();
    idEventSelected(event.id);
    if (newTitle && newDescription && newTagId && newEventDate) {
      handleEditEvent();
      setOpenEditEvent(false);
    }
    else {
      handleBlur('Il faut que tout les champs soit remplie et que la description soit de plus de 15 caractères.', 'errorEditEvent');
    }
  };
  /**
   * function that starts a timer to initialise the message after 60 seconds
   */
  if (errorsEditEvent) {
    for (const error of errorsEditEvent) {
      setTimeout(() => {
        handleBlur('', error);
      }, 60000);
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      {(loadingEvents)
        ? <Loader active inline="centered" />
        : (
          <>
            {errorEvents
              ? <p className="error">{errorEvents}</p>
              : (
                <>
                  {pseudo === event.creatorPseudo && (
                  <>
                    {deleteEvent && (
                    <>
                      <Redirect to="/evenements" exact />
                    </>
                    )}
                    <Modal
                      id="delete"
                      onClose={() => setOpenModalDelete(false)}
                      onOpen={() => setOpenModalDelete(true)}
                      open={openModalDelete}
                      trigger={<Button>Supprimer l'évènement</Button>}
                    >
                      <Modal.Header>supprimer l'évènement {event.title}</Modal.Header>
                      <Modal.Description>
                        <p>
                          voulez-vous supprimer l'évènement {event.title}?
                        </p>
                      </Modal.Description>
                      <Modal.Actions>
                        <Button onClick={() => setOpenModalDelete(false)}>
                          Non
                        </Button>
                        <Button
                          content="Oui"
                          labelPosition="right"
                          onClick={handleDeleteEventSubmit}
                        />
                      </Modal.Actions>
                    </Modal>

                    <Modal
                      size="fullscreen"
                      onClose={() => setOpenEditEvent(false)}
                      onOpen={() => setOpenEditEvent(true)}
                      open={openEditEvent}
                      trigger={<Button content="Modifier votre évènement" labelPosition="left" icon="edit" />}
                    >
                      <Modal.Header>Modifier un évènement</Modal.Header>
                      { errors && errors.map((error, index) => (<p key={index.toString()} className="error">{error}</p>))}
                      <Modal.Description>
                        <form autoComplete="off" onSubmit={handleEditEventSubmit} className="editEvent">
                          <Field
                            name="newTitle"
                            type="texte"
                            placeholder="titre de votre évènement"
                            onChange={changeFieldEvent}
                            onBlur={handleBlur}
                            value={newTitle}
                          />
                          <Field
                            name="newEventDate"
                            type="datetime-local"
                            placeholder="date de l'évènement"
                            value={newEventDate}
                            onBlur={handleBlur}
                            onChange={changeFieldEvent}
                          />
                          <div className="button-radio">

                            <Field
                              name="newTagId"
                              type="radio"
                              id="new"
                              value="1"
                              onBlur={handleBlur}
                              onChange={changeFieldEvent}
                            />
                            <label htmlFor="new">Soirée jeux</label>

                            <Field
                              name="newTagId"
                              type="radio"
                              id="murderParty"
                              value="2"
                              onBlur={handleBlur}
                              onChange={changeFieldEvent}
                            />
                            <label htmlFor="murderParty">Murder Partie</label>
                          </div>
                          <TextAreaDescription
                            className="newDescription"
                            type="text"
                            name="newDescription"
                            placeholder="écrivez votre évènement"
                            onChange={changeFieldEvent}
                            onBlur={handleBlur}
                            value={newDescription}
                          />

                          <Button onClick={() => setOpenEditEvent(false)}>
                            Annuler
                          </Button>
                          <Button onClick={handleEditEventSubmit}>
                            Valider
                          </Button>

                        </form>
                      </Modal.Description>
                    </Modal>
                  </>
                  )}
                  {editEvent
                    ? (
                      <>
                        <p className="success">Votre évènement a bien été modifié</p>
                        <p className="success">Pour reprendre votre navigation cliquer sur<Link to="/"> retourner à la page d'accueil"</Link></p>
                        <Card className="cardEvent" style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)' }}>
                          <Card.Content textAlign="center">
                            <Card.Header>{ nameTagIdEvent(newTagId)}</Card.Header>
                            <Card.Header>
                              {newTitle} pour la date du {newEventDate}
                            </Card.Header>
                            <Card.Meta>
                              <span>{event.creatorPseudo}</span>
                              {event.createdDate
                                ? <span> mise en ligne le { event.createdDate } </span>
                                : <span> mise en ligne le { event.updateDate } </span>}
                            </Card.Meta>
                            <Card.Description>
                              {newDescription}
                            </Card.Description>
                          </Card.Content>
                        </Card>
                      </>
                    )
                    : (
                      <>
                        {errorEditEvent && <p className="error">{errorEditEvent}</p>}
                        <Card className="cardEvent" style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)' }}>
                          <Card.Content textAlign="center">
                            <Card.Header>{ event.eventTag}</Card.Header>
                            <Card.Header>
                              {event.title} pour la date du {event.eventDate}
                            </Card.Header>
                            <Card.Meta>
                              <span>{event.creatorPseudo}</span>
                              {event.createdDate
                                ? <span> mise en ligne le { event.createdDate } </span>
                                : <span> mise en ligne le { event.updateDate } </span>}

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
                                onClose={() => setOpenUnsubscribe(false)}
                                onOpen={() => setOpenUnsubscribe(true)}
                                open={openUnsubscribe}
                                trigger={<Button><Icon name="remove user" /></Button>}
                              >

                                <Modal.Header>
                                  désincription à l'évènement {event.title}
                                </Modal.Header>
                                <Modal.Description>
                                  <p>
                                    voulez-vous vous désinscrire de l'évènement {event.title}
                                    pour la date du ${event.eventDate}?
                                  </p>
                                </Modal.Description>
                                <Modal.Actions>
                                  <Button onClick={() => setOpenUnsubscribe(false)}>
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
                                <p>
                                  voulez-vous participer à l'évènement {event.title}
                                  pour la date du {event.eventDate}?
                                </p>
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
                    )}
                </>
              )}

          </>
        )}
    </>
  );
};
OneEvent.propTypes = {
  pseudo: PropTypes.string.isRequired,
  event: PropTypes.object,
  changeFieldEvent: PropTypes.func.isRequired,
  handleEditEvent: PropTypes.func.isRequired,
  sendDeleteEvent: PropTypes.func.isRequired,
  participation: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  idEventSelected: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  editNewTitle: PropTypes.func.isRequired,
  editDescription: PropTypes.func.isRequired,
  toParticipate: PropTypes.bool.isRequired,
  isLogged: PropTypes.bool.isRequired,
  loadingEvents: PropTypes.bool.isRequired,
  editEvent: PropTypes.bool.isRequired,
  deleteEvent: PropTypes.bool.isRequired,
  errorEvents: PropTypes.string.isRequired,
  errorEditEvent: PropTypes.string.isRequired,
  errornewTitle: PropTypes.string.isRequired,
  errornewDescription: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  newTitle: PropTypes.string,
  newDescription: PropTypes.string,
  newTagId: PropTypes.string.isRequired,
  newEventDate: PropTypes.string.isRequired,
};

OneEvent.defaultProps = {
  event: {},
  newTitle: '',
  newDescription: '',
};

export default OneEvent;
