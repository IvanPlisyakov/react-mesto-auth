import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
)}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType,
  loggedIn: PropTypes.bool,
}

export default ProtectedRoute;