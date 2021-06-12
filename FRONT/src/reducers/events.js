/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import {
  SET_EVENTS,
  ID_EVENT_SELECTED,
  SET_FIELD_VALUE_EVENT,
  SET_ADD_NEW_EVENT,
  SET_EDIT_EVENT,
  SET_PARTICIPATE,
  EDIT_NEW_DESCRIPTION_EVENT,
  EDIT_NEW_TITLE_EVENT,
  INIT_VALUE_ADD_NEW_EVENT,
} from 'src/actions/events';
import { SET_LOADING } from 'src/actions/user';

export const initialState = {
  events: [
    {
      id: 1,
      title: '',
      description: '',
      eventDate: '',
      createdDate: '',
      updateDate: '',
      creatorId: 2,
      tagId: 2,
      eventTag: '',
      creatorPseudo: '',
      eventParticipants: [],
      eventGames: [],
    },
  ],
  newTitle: '',
  newDescription: '',
  newEventDate: '',
  newTagId: '',
  idEvent: '',
  toParticipate: false,
  newEvent: false,
  loadingEvents: true,
  editEvent: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        events: action.events,
      };
    case ID_EVENT_SELECTED:
      return {
        ...state,
        idEvent: action.id,

      };
    case SET_FIELD_VALUE_EVENT:
      return {
        ...state,
        [action.name]: action.value,
      };
    case SET_ADD_NEW_EVENT:
      return {
        ...state,
        newEvent: action.boolean,
      };
    case SET_EDIT_EVENT:
      return {
        ...state,
        editEvent: action.boolean,
      };
    case SET_PARTICIPATE:
      return {
        ...state,
        toParticipate: action.boolean,
      };
    case EDIT_NEW_DESCRIPTION_EVENT:
      return {
        ...state,
        newDescription: action.description,
      };
    case EDIT_NEW_TITLE_EVENT:
      return {
        ...state,
        newTitle: action.title,
      };
    case INIT_VALUE_ADD_NEW_EVENT:
      return {
        ...state,
        newTitle: '',
        newDescription: '',
        newEventDate: '',
        newTagId: '',
        idEvent: '',
        newEvent: false,
      };
    case SET_LOADING:
      return {
        ...state,
        [action.name]: action.boolean,
      };
    default:
      return state;
  }
};
