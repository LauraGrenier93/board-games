/* eslint-disable linebreak-style */
// Types of action
export const FETCH_EVENTS = 'FETCH_Events';
export const PARTICIPATION = 'PARTICIPATION';
export const ID_EVENT_SELECTED = 'ID_EVENT_SELECTED';
export const SEND_ADD_EVENT = 'SEND_ADD_EVENT';
export const SET_EDIT_EVENT = 'SET_EDIT_EVENT';
export const SEND_EDIT_EVENT = 'SEND_EDIT_EVENT';
export const SEND_UNSUBSCRIBE = 'SEND_UNSUBSCRIBE';
export const SEND_DELETE_EVENT = 'SEND_DELETE_EVENT';
export const SET_DELETE_EVENT = 'SET_DELETE_EVENT';
export const SET_EVENTS = 'SET_Events';
export const SET_FIELD_VALUE_EVENT = 'SET_FIELD_VALUE_EVENT';
export const SET_ADD_NEW_EVENT = 'SET_ADD_NEW_EVENT';
export const SET_PARTICIPATE = 'SET_PARTICIPATE';
export const INIT_VALUE_ADD_NEW_EVENT = 'INIT_VALUE_ADD_NEW_EVENT';
export const EDIT_NEW_TITLE_EVENT = 'EDIT_NEW_TITLE_EVENT';
export const EDIT_NEW_DESCRIPTION_EVENT = 'EDIT_NEW_DESCRIPTION_EVENT';

// creation of an action

/**
 * Action that changes the value of the boolean
 * in the store to display all events plus the one created
 * @param {bool} boolean
 */
export const setAddNewEvent = (boolean) => ({
  type: SET_ADD_NEW_EVENT,
  boolean,
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
 * action that indicates and stores the id number of the event
 * that a participant wants to register for
 * @param {string} id
 */
export const idEventSelected = (id) => ({
  type: ID_EVENT_SELECTED,
  id,
});

/**
 * action that sends a new event to the database
 */
export const sendAddEvent = () => ({
  type: SEND_ADD_EVENT,
});

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
 * @param {bool} boolean
 */
export const setParticipate = (boolean) => ({
  type: SET_PARTICIPATE,
  boolean,
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
/**
 *  action which, when an event is modified, will trigger its display
 */
export const setEditEvent = (boolean) => ({
  type: SET_EDIT_EVENT,
  boolean,
});

/**
 *  action that displays the title in preview if it has not been modified
 * @param {string} title
 */
export const editNewTitleEvent = (title) => ({
  type: EDIT_NEW_TITLE_EVENT,
  title,
});

/**
 *  action that displays the description in preview if it has not been modified
 * @param {string} description
 */
export const editDescriptionEvent = (description) => ({
  type: EDIT_NEW_DESCRIPTION_EVENT,
  description,
});

/**
 * action to delete an event
 */
export const sendDeleteEvent = () => ({
  type: SEND_DELETE_EVENT,
});

/**
 *  action which, when an event is modified, will trigger its display
 */
export const setDeleteEvent = (boolean) => ({
  type: SET_DELETE_EVENT,
  boolean,
});
