//From https://reacttraining.com/react-router/web/example/auth-workflow
import React, { Component } from 'react';
import {
    Route, 
    Redirect} from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return (
    <Route
      {...rest}
      render={props =>
        sessionStorage.getItem('auth') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signIn",
              state: {from: props.location}
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;