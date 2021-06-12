// Types of action
export const SET_FIELD_VALUE = 'SET_FIELD_VALUE';
export const SEND_LOGIN = 'SEND_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SEND_SIGN_IN_FORM = 'SEND_SIGN_IN_FORM';
export const SET_USER_IS_SIGN_IN = 'SET_USER_IS_SIGN_IN';
export const SEND_DISCONNECT = 'SEND_DISCONNECT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

// creation of an action
/**
 * Action to update the value of a formulair field in the store
 * @param {String} value
 * @param {String} name
 */
export const setFieldValue = (value, name) => ({
  type: SET_FIELD_VALUE,
  value,
  name,

});

/**
 * Action to make a request to the api in order to authenticate
 */
export const sendLogin = () => ({
  type: SEND_LOGIN,
});

/**
 * Action to apply to the api for registration
 */
export const sendSignInForm = () => ({
  type: SEND_SIGN_IN_FORM,
});

/**
 * Action to update user and login props to true in the store
 */
export const login = (email, firstname, id, lastname, logged, pseudo, role) => ({
  type: LOGIN,
  email,
  firstname,
  id,
  lastname,
  logged,
  pseudo,
  role,
});

/**
 * Action to update logged to false and initialise the user props in the store
 */
export const logout = (boolean) => ({
  type: LOGOUT,
  boolean,
});

/**
 * Action to display the form using the connection boolean
 * @param {string} message
 */
export const setUserIsSignIn = (signIn) => ({
  type: SET_USER_IS_SIGN_IN,
  signIn,
});

/**
 * Action to disconnect
 */
export const sendDisconnect = () => ({
  type: SEND_DISCONNECT,
});
/**
 * Action that displays success messages
 * @param {string} message
 */
export const setMessage = (message, name) => ({
  type: SET_MESSAGE,
  message,
  name,
});

/**
 * Action that displays error messages
 * @param {string} error
* @param {string} name
 */
export const setError = (error, name) => ({
  type: SET_ERROR,
  error,
  name,
});

/**
 * Action that displays or hidden loader
 * @param {bool} boolean
 * @param {string} name
 */
export const setLoading = (boolean, name) => ({
  type: SET_LOADING,
  boolean,
  name,
});
