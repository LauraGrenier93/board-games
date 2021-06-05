/**
 * function that checks the first or last name of a field
 * @param {string} name - value of the entered lastname or firstname
 */
 const validationName = (name) => {
  const regexName = /^\S{2,}$/;
  return regexName.test(name);
};

/**
 * function that checks the pseudo
 * @param {string} pseudo - 
 */
const validationPseudo = (pseudo) => {
  const regexPseudo = /^\S{3,40}$/;
  return regexPseudo.test(pseudo);
};

/**
 * function to check the password
 * @param {string} password
 */
const validationPassword = (password) => {
  const regexPassword = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
  return regexPassword.test(password);
};

/**
 * function that allows you to check the email
 * @param {string} email
 */
const validationEmail = (email) => {
  const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(email);
};

/**
 * function to check the length of the item description
 * @param {string} description
 */
 const validationNewDescription = (description) => {
  const regexDescription = /^(.{15,})$/;
  return regexDescription.test(description);
};

/**
 * function that checks the user input of a field after the focus is lost
 * @param {Event} valueInput - input field value
 * @param {string} nameInput - name of the input field
 * @param {string} placeholder
 */
export const validationForm = (valueInput, nameInput, placeholder) => {
  if (!valueInput) {
    return `front Le champs de votre ${placeholder} ne peut être vide`;
  }
  if (nameInput === 'firstName' && (!validationName(valueInput))) {
    return `front Le champs de votre ${placeholder} doit contenir au minimum 2 caratères, sans espace`;
  }
  if (nameInput === 'lastName' && (!validationName(valueInput))) {
    return `front Le champs de votre ${placeholder} doit contenir au minimum 2 caratères, sans espace`;
  }
  if (nameInput === 'password' && (!validationPassword(valueInput))) {
    return `front Le champs de votre ${placeholder}  doit avoir 8 caractères au minimum, une lettre minuscule, une lettre majuscule, un nombre et un caractères spécial parmis : (!@#$%^&*)`;
  }
  if (nameInput === 'emailAddress' && (!validationEmail(valueInput))) {
    return `front Le format de votre ${placeholder} est incorrect.`;
  }
  if (nameInput === 'passwordConfirm' && (!validationPassword(valueInput))) {
    return `front Le champs de votre ${placeholder}  doit avoir 8 caractères au minimum, une lettre minuscule, une lettre majuscule, un nombre et un caractères spécial parmis : (!@#$%^&*)`;
  }
  if (nameInput === 'pseudo' && (!validationPseudo(valueInput))) {
    return `front Le champs de votre ${placeholder} doit contenir au minimum 3 caractères et 40 au maximum, sans espace.`;
  }
  if (nameInput ==='newDescription' && (!validationNewDescription(valueInput))) {
    return `front Le champs de votre ${placeholder} doit contenir un minimum de 15 caractères`;
  }
  return '';
};
