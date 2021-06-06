// Types of action
export const FETCH_EVENTS = 'FETCH_Events';
export const PARTICIPATION = 'PARTICIPATION';
export const ID_EVENT_SELECTED = 'ID_EVENT_SELECTED';
export const SEND_ADD_EVENT = 'SEND_ADD_EVENT';
export const SEND_EDIT_EVENT = 'SEND_EDIT_EVENT';
export const SEND_UNSUBSCRIBE = 'SEND_UNSUBSCRIBE';
export const SET_EVENTS = 'SET_Events';
export const SET_FIELD_VALUE_EVENT = 'SET_FIELD_VALUE_EVENT';
export const SET_ADD_NEW_EVENT = 'SET_ADD_NEW_EVENT';
export const SET_PARTICIPATE = 'SET_PARTICIPATE';
export const INIT_VALUE_ADD_NEW_EVENT = 'INIT_VALUE_ADD_NEW_EVENT';



//creation of an action

/**
 * Action that changes the value of the boolean in the store to display all events plus the one created
 * @param {bool} bool 
 */
export const setAddNewEvent = (bool) => ({
  type: SET_ADD_NEW_EVENT,
  bool,
});

/**
 * action that requests api events
 */
export const fetchEvents = () => ({
  type: FETCH_EVENTS,
});

/**
 * action that displays events
 * @param {array} events
 */
export const setEvents = (events) => ({
  type: SET_EVENTS,
  events,
});

/**
 * action that transmits the addition of a participant to an event 
 */
export const participation = () => ({
  type: PARTICIPATION,
});

/**
 * action that indicates and stores the id number of the event that a participant wants to register for
 * @param {string} id 
 */
export const idEventSelected = (id) => ({
  type: ID_EVENT_SELECTED,
  id,
});

/**
 * action that sends a new event to the database
 */
export const sendAddEvent = () => {
  return({
  type: SEND_ADD_EVENT,
});
}
/**
 * Action to update the value of a field in the store
 * @param {String} value
 * @param {String} name
 */
export const setFieldValueEvent = (value, name) => ({
  type: SET_FIELD_VALUE_EVENT,
  value,
  name,
});

/**
 * Action to transmit the unregistration of an event
 */
export const sendUnsubscribe = () => ({
  type: SEND_UNSUBSCRIBE,
});

/**
 * Action to register or unregister for an event
 * @param {bool} bool
 */
export const setParticipate = (bool) => ({
  type: SET_PARTICIPATE,
  bool,
});

/**
 * Action to register or unregister for an event
 */
 export const initValueAddNewEvent = () => ({
  type: INIT_VALUE_ADD_NEW_EVENT,
});

/**
 *  action that sends an event modification to the database
 */
 export const sendEditEvent = () => ({
  type: SEND_EDIT_EVENT,
});
