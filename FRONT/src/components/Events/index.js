/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Loader,
} from 'semantic-ui-react';
import Field from 'src/components/Field';
import ContentEvents from 'src/components/Events/ContentEvents';
import TextAreaDescription from 'src/components/TextAreaDescription';
import './style.css';

const Events = ({
  events,
  changeFieldEvent,
  handleAddEvent,
  newTitle,
  newDescription,
  newEventDate,
  newTagId,
  isLogged,
  fetchEvents,
  addNewEvent,
  deleteEvent,
  initValueAddNewEvent,
  loadingEvents,
  handleBlur,
  errorEvents,
  errornewTitle,
  errornewDescription,
  errorAddEvent,
  error,
  message,
  messageEvents,
  setMessage,
}) => {
  const errorsNewEvent = ['errornewTitle', 'errornewDescription', 'errorAddEvent'];
  const errors = [errornewTitle, errornewDescription, errorAddEvent, error];
  /**
 * function that starts a timer to initialise the message after 20 seconds
 */
  if (message) {
    setTimeout(() => {
      setMessage('', 'message');
    }, 60000);
  }
  // function that is triggered when I add an event using the addNewEvent props
  useEffect(async () => {
    await fetchEvents();
    initValueAddNewEvent();
  }, [addNewEvent, deleteEvent]);

  const [open, setOpen] = React.useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newTitle && newDescription && newEventDate && newTagId) {
      handleAddEvent();
      setOpen(false);
    }
    else {
      handleBlur('Il faut un titre, une description de plus de 15 caractères, une date pour l\'évènement et une catégorie', 'errorAddEvent');
    }
  };
  /**
   * function that starts a timer to initialise the error message or after 60 seconds
   */
  if (errorsNewEvent) {
    for (const error of errorsNewEvent) {
      setTimeout(() => {
        handleBlur('', error);
      }, 60000);
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      {errorAddEvent && <p className="error">{errorAddEvent}</p>}
      {message && <p className="success">{message}</p>}
      {messageEvents && <p className="success">{messageEvents}</p>}
      {(loadingEvents)
        ? <Loader active inline="centered" />
        : (
          <>
            {errorEvents
              ? <p className="error">{errorEvents}</p>
              : (
                <>
                  {isLogged && (
                  <Modal
                    size="fullscreen"
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button content="Ajouter un évènement" labelPosition="left" icon="edit" />}
                  >
                    <Modal.Header>Ajout d'un évènement</Modal.Header>
                    <Modal.Description>
                      { errors && errors.map((error, index) => (<p key={index.toString()} className="error">{error}</p>))}
                      <form autoComplete="off" onSubmit={handleSubmit} className="addEvent">
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
                          type="texte"
                          name="newDescription"
                          placeholder="écrivez votre évènement"
                          onBlur={handleBlur}
                          onChange={changeFieldEvent}
                          value={newDescription}
                        />

                        <Button onClick={() => setOpen(false)}>
                          Annuler
                        </Button>
                        <Button onClick={handleSubmit}>
                          Valider
                        </Button>

                      </form>
                    </Modal.Description>
                  </Modal>
                  )}
                  <ContentEvents
                    elements={events}
                  />
                </>
              )}
          </>
        )}
    </>
  );
};
Events.propTypes = {
  events: PropTypes.array.isRequired,
  changeFieldEvent: PropTypes.func.isRequired,
  handleAddEvent: PropTypes.func.isRequired,
  initValueAddNewEvent: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  newTitle: PropTypes.string,
  newDescription: PropTypes.string,
  newEventDate: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  messageEvents: PropTypes.string.isRequired,
  newTagId: PropTypes.string.isRequired,
  errornewTitle: PropTypes.string.isRequired,
  errornewDescription: PropTypes.string.isRequired,
  errorAddEvent: PropTypes.string.isRequired,
  errorEvents: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  addNewEvent: PropTypes.bool.isRequired,
  deleteEvent: PropTypes.bool.isRequired,
  loadingEvents: PropTypes.bool.isRequired,
};

Events.defaultProps = {
  newTitle: '',
  newDescription: '',
};

export default Events;
