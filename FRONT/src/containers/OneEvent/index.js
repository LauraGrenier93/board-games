/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import OneEvent from 'src/components/OneEvent';
import {
  participation,
  fetchEvents,
  idEventSelected,
  sendUnsubscribe,
  sendDeleteEvent,
  setFieldValueEvent,
  sendEditEvent,
  editNewTitleEvent,
  editDescriptionEvent,
  setParticipate,
} from 'src/actions/events';
import { setMessage, setError } from 'src/actions/user';
import { fetchGames } from 'src/actions/games';
import { fetchArticles } from 'src/actions/articles';

const mapStateToProps = (state) => (
  {
    toParticipate: state.events.toParticipate,
    pseudo: state.user.pseudo,
    isLogged: state.user.logged,
    error: state.user.error,
    message: state.user.message,
    loadingEvents: state.events.loadingEvents,
    editEvent: state.events.editEvent,
    deleteEvent: state.events.deleteEvent,
    errorEvents: state.user.errorEvents,
    errorEditEvent: state.user.errorEditEvent,
    errorDeleteEvent: state.user.errorDeleteEvent,
    errornewTitle: state.user.errornewTitle,
    errornewDescription: state.user.errornewDescription,
    newTitle: state.events.newTitle,
    newDescription: state.events.newDescription,
    newTagId: state.events.newTagId,
    newEventDate: state.events.newEventDate,
  });
const mapDispatchToProps = (dispatch) => ({
  participation: () => dispatch(participation()),
  fetchArticles: () => dispatch(fetchArticles()),
  fetchGames: () => dispatch(fetchGames()),
  fetchEvents: () => dispatch(fetchEvents()),
  idEventSelected: (id) => dispatch(idEventSelected(id)),
  unsubscribe: () => dispatch(sendUnsubscribe()),
  setMessage: (message, name) => dispatch(setMessage(message, name)),
  changeFieldEvent: (value, name) => dispatch(setFieldValueEvent(value, name)),
  handleEditEvent: () => dispatch(sendEditEvent()),
  sendDeleteEvent: () => dispatch(sendDeleteEvent()),
  handleBlur: (error, name) => dispatch(setError(error, name)),
  editNewTitle: (title) => dispatch(editNewTitleEvent(title)),
  editDescription: (description) => dispatch(editDescriptionEvent(description)),
  setParticipate: (boolean) => dispatch(setParticipate(boolean)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneEvent);
