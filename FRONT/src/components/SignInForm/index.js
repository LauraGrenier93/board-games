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
  const errorNames = ['errorfirstName','errorlastName','errorpseudo','erroremailAddress','errorpasswordConfirm','errorpassword','errorSendSignIn'];
  const errors=[errorfirstName,errorlastName,errorpseudo,erroremailAddress,errorpasswordConfirm,errorpassword, errorSubmitSignInform, errorSendSignIn];
  /**
   * function that is activated when the form is submitted
   * @param {Event} evt 
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (password === passwordConfirm) {
      handleSignInForm();
    }
    else {
      handleBlur('La confirmation du mot de passe est incorrecte', 'errorSubmitSignInform');
  };
}
  if(errorNames){
    for(const error of errorNames)
    setTimeout(() => {
      handleBlur('', error)
    }, 20000);
    }

  return (
    <div className="login-form">
      { errors && errors.map((error,index)=>(<p key={index.toString()} className="error">{error}</p>))}
      {signIn && (
        <Redirect to="/connexion" />
      )}
      {!signIn && (

      <div className="container_login">
        <form autoComplete="off" className="login-form-element" onSubmit={handleSubmit}>
          <h1> Inscription </h1>
          <Field
            name="firstName"
            placeholder="Prénom"
            onChange={changeField}
            value={firstName}
            onBlur={handleBlur}
          />
          <Field
            name="lastName"
            placeholder="Nom"
            onChange={changeField}
            value={lastName}
            onBlur={handleBlur}
          />
          <div className="pseudo">
            <Field
              name="pseudo"
              placeholder="Pseudo"
              onChange={changeField}
              value={pseudo}
              onBlur={handleBlur}
            />
            <span className="popup"> Votre pseudo doit comporter au moins 3 caractéres </span>
          </div>

          <div className="pseudo">
            <Field
              name="emailAddress"
              placeholder="Adresse email"
              onChange={changeField}
              value={emailAddress}
              onBlur={handleBlur}
            />
            <span className="popup"> Merci de vérifier vos emails suite à votre inscription... </span>
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
            <span className="popup"> Votre password doit avoir un nombre minimum de 8 caractéres, une lettre majuscule, une lettre minuscule et un caractére spécial parmis : !@#$%^&* </span>
          </div>
          <button
            className="validate"
            type="submit"
          >
            Valider
          </button>
          <h3>* Votre email devra être vérifié pour vous connecter,
            merci de cliquer sur le lien envoyé.
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
  signIn: PropTypes.bool,
  errorfirstName:PropTypes.string,
  errorlastName:PropTypes.string,
  errorpseudo:PropTypes.string,
  erroremailAddress:PropTypes.string,
  errorpasswordConfirm:PropTypes.string,
  errorpassword:PropTypes.string,
  errorSubmitSignInform:PropTypes.string,
  errorSendSignIn:PropTypes.string,
  handleBlur: PropTypes.func,
};

export default SignInForm;
