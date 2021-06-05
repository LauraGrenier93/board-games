/* eslint-disable no-empty */
import {
  SEND_UNSUBSCRIBE,
  SEND_ADD_EVENT,
  FETCH_EVENTS,
  PARTICIPATION,
  setEvents,
  setAddNewEvent,
  setParticipate,
} from 'src/actions/events';
import { setError,setLoading } from 'src/actions/user'; 
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  const { user: { pseudo, idUser } } = store.getState();
  const {
    events: {
      idEvent, newTitle, newDescription, newTagId, newEventDate,
    },
  } = store.getState();
  const numberId = parseInt(idUser, 10);
  switch (action.type) {
    case FETCH_EVENTS: {
      try {
        const response = await axios.get('evenements');
        store.dispatch(setEvents(response.data));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu afficher les évènements.', 'errorEvents'));
      }
      finally{
        store.dispatch(setLoading(false, 'loadingEvents'));
        return next(action);
      }

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
        store.dispatch(setError('Nous avons eu un problème technique, nous n\'avons pas pu ajouter votre participation à l\'évènement.'));
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
        console.log('error', error);
        console.log('error.response.data', error.response.data);
        console.log('error.response.status', error.response.status);
        console.log('error.response.headers', error.response.headers);
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu ajouter votre participation à l\'évènement.'));
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
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu supprimer votre participation à l\'évènement.'));
      }
      return next(action);
    }

    default:
      return next(action);
  }
};
