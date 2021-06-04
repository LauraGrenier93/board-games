import { connect } from 'react-redux'; 
import Events from 'src/components/Events'; 
import { fetchEvents, sendAddEvent, setFieldValueEvent, initValueAddNewEvent } from 'src/actions/events'; 

const mapStateToProps = (state) => {
  console.log('containers events state.events.events', state.events.events)
return(
  {
    events: state.events.events,
    newTitle: state.events.newTitle,
    newDescription: state.events.newDescription,
    newEventDate: state.events.newEventDate,
    isLogged: state.user.logged,
    addNewEvent: state.events.newEvent,
  });
}
const mapDispatchToProps = (dispatch) => ({
  fetchEvents: () => dispatch(fetchEvents()),
  changeFieldEvent: (value, name) => dispatch(setFieldValueEvent(value, name)),
  handleAddEvent: () => dispatch(sendAddEvent()),
  initValueAddNewEvent: () => dispatch(initValueAddNewEvent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Events);
