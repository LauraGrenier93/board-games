/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Redirect } from 'react-router-dom';
import './style.css';

const LoginForm = ({
  pseudo,
  password,
  changeField,
  handleLogin,
  isLogged,
  errorpseudo,
  errorpassword,
  errorSendLogin,
  messageLogin,
  handleBlur,
  setMessage,
}) => {
  const ErrorNames = ['errorpseudo', 'errorpassword', 'errorSendLogin'];
  /**
   * function that is activated when the form is submitted
   * @param {Event} evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (pseudo && password) {
      handleLogin();
    }
    else {
      handleBlur('Il faut que les champs pseudo et password soient remplis.', 'errorSendLogin');
    }
  };

  /**
   * function that starts a timer to initialise the success message or after 20 seconds
   */
  if (messageLogin) {
    setTimeout(() => {
      setMessage('', messageLogin);
    }, 20000);
  }
  /**
   * function that starts a timer to initialise the error message or after 20 seconds
   */
  if (ErrorNames) {
    for (const error of ErrorNames) {
      setTimeout(() => {
        handleBlur('', error);
      }, 20000);
    }
  }

  return (
    <div className="login-form">
      {errorpseudo && <p className="error">{errorpseudo}</p>}
      {errorpassword && <p className="error">{errorpassword}</p>}
      {errorSendLogin && <p className="error">{errorSendLogin}</p>}
      {messageLogin && <p className="success">{messageLogin}</p>}
      {isLogged && (
        <Redirect to="/" exact />
      )}
      {!isLogged && (
        <>
          <div className="container_login">
            <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
              <h1> Connexion</h1>

              <div className="input">
                <Field
                  name="pseudo"
                  className="input_field"
                  placeholder="Votre pseudo"
                  onChange={changeField}
                  value={pseudo}
                  onBlur={handleBlur}
                />
                <span className="popup"> Votre pseudo doit comporter au minimim 3 caractères... </span>
              </div>

              <div className="input">
                <Field
                  name="password"
                  type="password"
                  className="input_field"
                  placeholder="Votre mot de passe"
                  onChange={changeField}
                  value={password}
                  onBlur={handleBlur}
                />
                <span className="popup"> Votre password doit avoir un nombre minimum de 8 caractères, une lettre majuscule, une lettre minuscule et un caractére spécial parmis : !@#$%^&* </span>
              </div>

              <button
                className="validate"
                type="submit"
              >
                Valider
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
LoginForm.propTypes = {
  pseudo: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errorpseudo: PropTypes.string.isRequired,
  errorpassword: PropTypes.string.isRequired,
  errorSendLogin: PropTypes.string.isRequired,
  messageLogin: PropTypes.string.isRequired,
  isLogged: PropTypes.bool.isRequired,
  setMessage: PropTypes.func.isRequired,
};

export default LoginForm;
