/* eslint-disable import/no-unresolved */
/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
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
  const handleBlur = () => {
    // console.log('components Field evt.target', evt.target.value);
    // console.log('components Field value', value);
    const message = validationForm(value, name, placeholder);
    onBlur(message, `error${name}`);
    console.log('components Field error+name', `error${name}`);
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
      />
    </div>
  );
};

Field.propTypes = {
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};
Field.defaultProps = {
  placeholder: '',
};
export default Field;
