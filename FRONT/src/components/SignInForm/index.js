/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/Field';
import { Redirect } from 'react-router-dom';
import './style.css';

const SignInForm = ({
  firstName,
  lastName,
  pseudo,
  emailAddress,
  passwordConfirm,
  password,
  changeField,
  handleSignInForm,
  signIn,
  errorfirstName,
  errorlastName,
  errorpseudo,
  erroremailAddress,
  errorpasswordConfirm,
  errorpassword,
  errorSubmitSignInform,
  errorSendSignIn,
  handleBlur,
}) => {
  const errorNames = ['errorfirstName', 'errorlastName', 'errorpseudo', 'erroremailAddress', 'errorpasswordConfirm', 'errorpassword', 'errorSendSignIn'];
  const errors = [
    errorfirstName,
    errorlastName,
    errorpseudo,
    erroremailAddress,
    errorpasswordConfirm,
    errorpassword,
    errorSubmitSignInform,
    errorSendSignIn];
  /**
   * function that is activated when the form is submitted
   * @param {Event} evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password !== passwordConfirm) {
      handleBlur('La confirmation du mot de passe est incorrecte', 'errorSubmitSignInform');
    }
    else if (!firstName || !lastName || !pseudo || !emailAddress || !passwordConfirm || !password) {
      handleBlur('Il faut que tous les champs soient remplis', 'errorSubmitSignInform');
    }
    else {
      handleSignInForm();
    }
  };
  if (errorNames) {
    for (const error of errorNames) {
      setTimeout(() => {
        handleBlur('', error);
      }, 20000);
    }
  }

  return (
    <div className="login-form">
      { errors && errors.map((error, index) => (<p key={index.toString()} className="error">{error}</p>))}
      {signIn && (
        <Redirect to="/connexion" />
      )}
      {!signIn && (

      <div className="container_login">
        <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
          <h1> Inscription </h1>
          <Field
            name="firstName"
            type="text"
            placeholder="Pr??nom"
            onChange={changeField}
            value={firstName}
            onBlur={handleBlur}
          />
          <Field
            name="lastName"
            type="text"
            placeholder="Nom"
            onChange={changeField}
            value={lastName}
            onBlur={handleBlur}
          />
          <div className="pseudo">
            <Field
              name="pseudo"
              type="text"
              placeholder="Pseudo"
              onChange={changeField}
              value={pseudo}
              onBlur={handleBlur}
            />
            <span className="popup"> Votre pseudo doit comporter au moins 3 caract??res </span>
          </div>

          <div className="pseudo">
            <Field
              name="emailAddress"
              type="email"
              placeholder="Adresse email"
              onChange={changeField}
              value={emailAddress}
              onBlur={handleBlur}
            />
            <span className="popup"> Merci de v??rifier vos emails suite ?? votre inscription... </span>
          </div>
          <div className="pseudo">
            <Field
              name="password"
              type="password"
              placeholder="Mot de passe"
              onChange={changeField}
              value={password}
              onBlur={handleBlur}
            />
            <Field
              name="passwordConfirm"
              type="password"
              className="passwordConfirm"
              placeholder="Confirmation du mot de passe"
              onChange={changeField}
              value={passwordConfirm}
              onBlur={handleBlur}
            />
            <span className="popup"> Votre password doit avoir un nombre minimum de 8 caract??res, une lettre majuscule, une lettre minuscule et un caract??re sp??cial parmis : !@#$%^&* </span>
          </div>
          <button
            className="validate"
            type="submit"
          >
            Valider
          </button>
          <h3>* Votre email devra ??tre v??rifi?? pour vous connecter,
            merci de cliquer sur le lien envoy??.
          </h3>
        </form>
      </div>
      )}
    </div>
  );
};

SignInForm.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  emailAddress: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleSignInForm: PropTypes.func.isRequired,
  signIn: PropTypes.bool.isRequired,
  errorfirstName: PropTypes.string.isRequired,
  errorlastName: PropTypes.string.isRequired,
  errorpseudo: PropTypes.string.isRequired,
  erroremailAddress: PropTypes.string.isRequired,
  errorpasswordConfirm: PropTypes.string.isRequired,
  errorpassword: PropTypes.string.isRequired,
  errorSubmitSignInform: PropTypes.string.isRequired,
  errorSendSignIn: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default SignInForm;
