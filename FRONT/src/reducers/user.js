import {
  SET_FIELD_VALUE,
  LOGIN,
  LOGOUT,
  SET_USER_IS_SIGN_IN,
  SET_MESSAGE,
  SET_ERROR,
} from 'src/actions/user';

export const initialState = {
  idUser: '',
  firstName: '',
  lastName: '',
  pseudo: '',
  emailAddress: '',
  role: '',
  passwordConfirm: '',
  avatar: '',
  password: '',
  logged: false,
  signIn: false,
  messageHome: '',
  messageLogin: '',
  message:'',
  errorArticles: '',
  errorGames:'',
  errorEvents:'',
  errorfirstName:'',
  errorlastName:'',
  errorpseudo:'',
  erroremailAddress:'',
  errorpasswordConfirm:'',
  errorpassword:'',
  errorSubmitSignInform:'',
  errorSendSignIn:'',
  errorSendLogin:'',
  error:'',
  newemail: '',
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_FIELD_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case LOGIN:
      return {
        ...state,
        idUser: action.id,
        firstName: action.firstname,
        lastName: action.lastname,
        pseudo: action.pseudo,
        emailAddress: action.email,
        role: action.role,
        logged: action.logged,
        password: '',
        signIn: false,
        errorArticles: '',
        errorGames:'',
        errorEvents:'',
        errorfirstName:'',
        errorlastName:'',
        errorpseudo:'',
        erroremailAddress:'',
        errorpasswordConfirm:'',
        errorpassword:'',
        errorSubmitSignInform:'',
        errorSendSignIn:'',
        errorSendLogin:'',
        error:'',
      };
    case LOGOUT:
      return {
        ...state,
        idUser: '',
        firstName: '',
        lastName: '',
        pseudo: '',
        emailAddress: '',
        role: '',
        passwordConfirm: '',
        avatar: '',
        password: '',
        logged: action.bool,
        signIn: false,
        errorArticles: '',
        errorGames:'',
        errorEvents:'',
        errorfirstName:'',
        errorlastName:'',
        errorpseudo:'',
        erroremailAddress:'',
        errorpasswordConfirm:'',
        errorpassword:'',
        errorSubmitSignInform:'',
        errorSendSignIn:'',
        errorSendLogin:'',
        error:'',
        newEmail: '',
      };
    case SET_USER_IS_SIGN_IN:
      return {
        ...state,
        signIn: action.signIn,
        password: '',
        pseudo: '',
      };
    case SET_MESSAGE:
      return {
        ...state,
        [action.name]: action.message,
        errorArticles: '',
        errorGames:'',
        errorEvents:'',
        errorfirstName:'',
        errorlastName:'',
        errorpseudo:'',
        erroremailAddress:'',
        errorpasswordConfirm:'',
        errorpassword:'',
        errorSubmitSignInform:'',
        errorSendSignIn:'',
        errorSendLogin:'',
        error:'',
      };
    case SET_ERROR:
      return {
        ...state,
        [action.name]: action.error,
        messageHome: '',
        messageLogin: '',
        message:'',
      };
    default:
      return state;
  }
};