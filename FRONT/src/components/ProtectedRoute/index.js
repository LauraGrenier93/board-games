/* eslint-disable linebreak-style */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isLogged }) => (
  <>
    { isLogged && (
      <Route>
        <Component />
      </Route>
    )}
    {!isLogged && (<Redirect to="/unauthorized" />)}
  </>
);

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
