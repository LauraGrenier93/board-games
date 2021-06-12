/* eslint-disable no-empty */
import {
  SEND_SIGN_IN_FORM,
  SEND_LOGIN,
  SEND_DISCONNECT,
  setUserIsSignIn,
  login,
  logout,
  setMessage,
  setError,
} from 'src/actions/user';
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  const {
    user: {
      pseudo, password, firstName, lastName, emailAddress, passwordConfirm,
    },
  } = store.getState();
  switch (action.type) {
    case SEND_LOGIN: {
      try {
        const response = await axios.post('connexion', { pseudo, password });
        response.config.data = { pseudo: '', password: '' };
        localStorage.setItem('tokens', response.data.token);
        store.dispatch(
          login(
            response.data.email,
            response.data.firstname,
            response.data.id,
            response.data.lastname,
            response.data.logged,
            response.data.pseudo,
            response.data.role,
          ),
        );
        store.dispatch(setMessage('Vous êtes connecté', 'messageHome'));
      }
      catch (error) {
        store.dispatch(setError('Votre identifiant ou votre mot de passe est incorrect', 'errorSendLogin'));
      }
      return next(action);
    }
    case SEND_SIGN_IN_FORM: {
      try {
        const response = await axios.post('inscription', {
          pseudo, firstName, lastName, emailAddress, password, passwordConfirm,
        });
        store.dispatch(setMessage(response.data.message, 'messageLogin'));
        store.dispatch(setUserIsSignIn(true));
      }
      catch (error) {
        if (error.response.data === '"passwordConfirm" must be [ref:password]') {
          store.dispatch(setError('Votre mot de passe n\'est pas identique à votre confirmation de mot de passe', 'errorSendSignIn'));
        }
        else if (error.response.data === '"password" is not allowed to be empty') {
          store.dispatch(setError('Le champs de votre mot de passe ne peut être vide', 'errorSendSignIn'));
        }
        else {
          store.dispatch(setError(error.response.data, 'errorSendSignIn'));
        }
      }
      return next(action);
    }
    case SEND_DISCONNECT: {
      try {
        const tokens = localStorage.getItem('tokens');
        const options = {
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        };
        await axios.get('deconnexion', options);
        localStorage.removeItem('tokens');
        store.dispatch(logout(false));
        store.dispatch(setMessage('Vous êtes déconnecté.', 'message'));
      }
      catch (error) {
        store.dispatch(setError('Nous avons eu un problème technique, vous n\'êtes pas déconnecté.', 'error'));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
