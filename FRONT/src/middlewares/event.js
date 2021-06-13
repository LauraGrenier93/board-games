/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty */
import {
  SEND_UNSUBSCRIBE,
  SEND_ADD_EVENT,
  SEND_EDIT_EVENT,
  SEND_DELETE_EVENT,
  FETCH_EVENTS,
  PARTICIPATION,
  setEvents,
  setAddNewEvent,
  setParticipate,
  setEditEvent,
  setDeleteEvent,
} from 'src/actions/events';
import { setError, setMessage, setLoading } from 'src/actions/user';
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  const { user: { pseudo, idUser } } = store.getState();
  const {
    events: {
      idEvent, newTitle, newDescription, newTagId, newEventDate,
    },
  } = store.getState();
  const numberId = parseInt(idUser, 10);
  const urlEditEvent = `/evenements/${idEvent}`;
  const urlDeleteEvent = `/evenements/${idEvent}`;
  switch (action.type) {
    case FETCH_EVENTS: {
      try {
        const response = await axios.get('evenements');
        store.dispatch(setEvents(response.data));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu afficher les évènements.', 'errorEvents'));
      }
      finally {
        store.dispatch(setLoading(false, 'loadingEvents'));
      }
      return next(action);
    }
    case PARTICIPATION: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.post('participants', {
          id: idEvent,
          pseudo,
        }, options);
        store.dispatch(setParticipate(true));
      }
      catch (error) {
        store.dispatch(setError('Nous avons eu un problème technique, nous n\'avons pas pu ajouter votre participation à l\'évènement.', 'errorEditEvent'));
      }
      return next(action);
    }
    case SEND_ADD_EVENT: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.post('evenements', {
          title: newTitle,
          description: newDescription,
          creatorId: numberId,
          eventDate: newEventDate,
          tagId: newTagId,
        }, options);
        store.dispatch(setAddNewEvent(true));
      }

      catch (error) {
        if (error.response.data === '"title" is not allowed to be empty') {
          store.dispatch(setError('Le champs titre de l\'évènement ne peut être vide.', 'errorAddEvent'));
        }
        else if (error.response.data === '"description" is not allowed to be empty') {
          store.dispatch(setError('Le champs description de l\'évènement ne peut être vide.', 'errorAddEvent'));
        }
        else if (error.response.data === '"description" length must be at least 15 characters long') {
          store.dispatch(setError('La description de l\'évènement doit contenir au moins 15 caractères.', 'errorAddEvent'));
        }
        else if (error.response.data === '"eventDate" must be a valid date') {
          store.dispatch(setError('Il manque la date de l\'évènement.', 'errorAddEvent'));
        }
        else if (error.response.data === '"tagId" must be a number') {
          store.dispatch(setError('Il manque la catégorie de l\'évènement.', 'errorAddEvent'));
        }
        else {
          store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu ajouter l\'évènement.', 'errorAddEvent'));
        }
      }
      return next(action);
    }
    case SEND_EDIT_EVENT: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.patch(urlEditEvent, {
          title: newTitle,
          description: newDescription,
          creatorId: numberId,
          tagId: newTagId,
        }, options);
        store.dispatch(setEditEvent(true));
      }
      catch (error) {
        if (error.response.data === '"title" is not allowed to be empty') {
          store.dispatch(setError('Le champs titre de l\'évènement ne peut être vide.', 'errorEditEvent'));
        }
        else if (error.response.data === '"description" is not allowed to be empty') {
          store.dispatch(setError('Le champs description de l\'évènement ne peut être vide.', 'errorEditEvent'));
        }
        else if (error.response.data === '"description" length must be at least 15 characters long') {
          store.dispatch(setError('La description de l\'évènement doit contenir au moins 15 caractères.', 'errorEditEvent'));
        }
        else if (error.response.data === '"eventDate" must be a valid date') {
          store.dispatch(setError('Il manque la date de l\'évènement.', 'errorEditEvent'));
        }
        else if (error.response.data === '"tagId" must be a number') {
          store.dispatch(setError('Il manque la catégorie de l\'évènement.', 'errorEditEvent'));
        }
        else {
          store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu ajouter l\'évènement.', 'errorEditEvent'));
        }
      }
      return next(action);
    }
    case SEND_UNSUBSCRIBE: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.patch('participants', {
          id: idEvent,
          pseudo,
        }, options);
        store.dispatch(setParticipate(false));
      }

      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu supprimer votre participation à l\'évènement.', 'errorEditEvent'));
      }
      return next(action);
    }
    case SEND_DELETE_EVENT: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.delete(urlDeleteEvent, options);
        store.dispatch(setDeleteEvent(true));
        store.dispatch(setMessage('Votre évènement a bien été supprimé', 'messageEvents'));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu supprimer l\'évènement.', 'errorDeleteEvent'));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
