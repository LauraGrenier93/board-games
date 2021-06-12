/* eslint-disable linebreak-style */
import { expect } from 'chai';
import userReducer, { initialState } from 'src/reducers/user';
import {
  setFieldValue, login, logout, setUserIsSignIn, setMessage, setError,
} from 'src/actions/user';

describe('reducer for user', () => {
  describe('structure', () => {
    it('must be a function', () => {
      expect(userReducer).to.a('function');
    });
    it('check initial state', () => {
      expect(initialState).to.be.an('object');
      expect(userReducer()).to.be.equal(initialState);
    });
  });
});

describe('actions', () => {
  it('setFieldValue must set field value user', () => {
    const titleValue = 'un prénom';
    const titleName = 'firstName';
    const action = setFieldValue(titleValue, titleName);
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
      idUser: '',
      firstName: titleValue,
      lastName: '',
      pseudo: '',
      emailAddress: '',
      role: '',
      passwordConfirm: '',
      avatar: '',
      password: '',
      logged: false,
      signIn: false,
      message: '',
      error: '',
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });

  it('login must set login', () => {
    const newUser = {
      emailAddress: 'uneEmail@gmail.com',
      firstName: 'un prénom',
      idUser: '1',
      lastName: 'un nom',
      logged: true,
      pseudo: 'un pseudo',
      role: 'membre',
    };
    const action = login(
      newUser.emailAddress,
      newUser.firstName,
      newUser.idUser,
      newUser.lastName,
      newUser.logged,
      newUser.pseudo,
      newUser.role,
    );
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
      idUser: newUser.idUser,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      pseudo: newUser.pseudo,
      emailAddress: newUser.emailAddress,
      role: newUser.role,
      logged: newUser.logged,
      password: '',
      signIn: false,
      error: '',
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      passwordConfirm: '',
      avatar: '',
      message: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });

  it('logout must set logout= false', () => {
    const newValuelogged = false;
    const action = logout(newValuelogged);
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
      idUser: '',
      firstName: '',
      lastName: '',
      pseudo: '',
      emailAddress: '',
      role: '',
      passwordConfirm: '',
      avatar: '',
      password: '',
      logged: newValuelogged,
      signIn: false,
      message: '',
      error: '',
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });

  it('setUserIsSignIn must set signIn = true', () => {
    const newValueSingIn = false;
    const action = setUserIsSignIn(newValueSingIn);
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
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
      signIn: newValueSingIn,
      message: '',
      error: '',
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });

  it('setMessage must set message of succes', () => {
    const newValueMessage = "un message d'information de succes";
    const action = setMessage(newValueMessage, 'message');
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
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
      message: newValueMessage,
      error: '',
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });

  it('setError must set message of error', () => {
    const newValueMessageError = 'un message d\'erreur';
    const action = setError(newValueMessageError, 'error');
    const newState = userReducer(initialState, action);
    expect(newState).to.be.eql({
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
      message: '',
      error: newValueMessageError,
      errorAddArticle: '',
      errorAddEvent: '',
      errorArticles: '',
      errorDeleteArticle: '',
      errorEditArticle: '',
      errorEditEvent: '',
      errorEvents: '',
      errorGames: '',
      errorSendLogin: '',
      errorSendSignIn: '',
      errorSubmitSignInform: '',
      erroremailAddress: '',
      errorfirstName: '',
      errorlastName: '',
      errornewDescription: '',
      errornewTitle: '',
      errorpassword: '',
      errorpasswordConfirm: '',
      errorpseudo: '',
      newemail: '',
      messageHome: '',
      messageLogin: '',
    });
  });
});
