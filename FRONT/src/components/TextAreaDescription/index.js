
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
    // console.log('components TextAreaDescription evt.target', evt.target.value);
    // console.log('components TextAreaDescription value', value);
    const nameInputFr = "description de l'article";
    const message = validationForm(value, name, nameInputFr);
    onBlur(message, 'error'+name);
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
