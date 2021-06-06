import { connect } from 'react-redux'; 
import Events from 'src/components/Events'; 
import { fetchEvents, sendAddEvent, setFieldValueEvent, initValueAddNewEvent } from 'src/actions/events'; 
import { setMessage,setError } from 'src/actions/user';
const mapStateToProps = (state) => (
  {
    events: state.events.events,
    newTitle: state.events.newTitle,
    newDescription: state.events.newDescription,
    newEventDate: state.events.newEventDate,
    newTagId: state.events.newTagId,
    isLogged: state.user.logged,
    addNewEvent: state.events.newEvent,
    error: state.user.error,
    errorEvents: state.user.errorEvents,
    errornewTitle: state.user.errornewTitle,
    errornewDescription: state.user.errornewDescription,
    errorAddEvent: state.user.errorAddEvent,
    message: state.user.message,
    loadingEvents: state.events.loadingEvents,
    errorEvents:state.user.errorEvents,
  });

const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  changeFieldEvent: (value, name) => dispatch(setFieldValueEvent(value, name)),
  handleAddEvent: () => dispatch(sendAddEvent()),
  initValueAddNewEvent: () => dispatch(initValueAddNewEvent()),
  setMessage:(message, name)=> dispatch(setMessage(message, name)),
  handleBlur: (error, name) => dispatch(setError(error, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
