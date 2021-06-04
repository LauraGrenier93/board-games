import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, isLogged }) => {
  console.log('components ProtectedRoute isLogged', isLogged);
  return (
    <>
      { isLogged && (
      <Route>
        <Component />
      </Route>
      )}
      {!isLogged && (<Redirect to="/unauthorized" />)}
    </>
  );
};
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isLogged: PropTypes.bool,
};

export default ProtectedRoute;
