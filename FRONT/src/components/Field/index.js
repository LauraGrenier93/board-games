import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { validationForm } from 'src/selectors/validator.js';

const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
  onBlur,
}) => {
  const handleChange = (evt) => {
  // console.log('components Field evt.target', evt.target.value);
  // console.log('components Field value', value);
    onChange(evt.target.value, name);
  };
  const handleBlur = (evt) => {
   // console.log('components Field evt.target', evt.target.value);
   // console.log('components Field value', value);
   const message = validationForm(value, name, placeholder);
   onBlur(message, 'error'+name);
  };

  return (
    <div className="container-field">
      <input
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="field"
        type={type}
        placeholder={placeholder}
        name={name}
        checked
      />
    </div>
  );
};

Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};


export default Field;
