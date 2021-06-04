
import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';
import { validationForm } from 'src/selectors/validator.js';

const TextAreaDescription = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  onBlur,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };
  const handleBlur = (evt) => {
    const nameInputFr = "description de l'article";
    const valueInput = evt.target.value;
    const message = validationForm(valueInput, name, nameInputFr);
    console.log('message handleBlur', message);
    onBlur(message);
  };

  const inputId = `field-${name}`;

  return (
    <div>
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
      />

      <label
        htmlFor={inputId}
      >
        {placeholder}
      </label>
    </div>
  );
};

TextAreaDescription.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};

export default TextAreaDescription;
