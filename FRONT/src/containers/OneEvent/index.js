/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { connect } from 'react-redux';
import OneEvent from 'src/components/OneEvent';
import {
  participation,
  fetchEvents,
  idEventSelected,
  sendUnsubscribe,
  setFieldValueEvent,
  sendEditEvent,
  editNewTitleEvent,
  editDescriptionEvent,
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
    errorEvents: state.user.errorEvents,
    errorEditEvent: state.user.errorEditEvent,
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
  handleBlur: (error, name) => dispatch(setError(error, name)),
  editNewTitle: (title) => dispatch(editNewTitleEvent(title)),
  editDescription: (description) => dispatch(editDescriptionEvent(description)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneEvent);
