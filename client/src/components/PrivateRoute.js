//From https://reacttraining.com/react-router/web/example/auth-workflow
import React, { Component } from 'react';
import {
    Route, 
    Redirect} from 'react-router-dom';
import { Consumer } from './Context'

//defines a higher order component for configuring protected routes
function PrivateRoute({ component: Component, ...rest }) {
    return (
    <Consumer>
     {context => {
         return(
            <Route
            {...rest}
            render={props =>
                context.isAuthenticated ? (
                <Component {...props}/>
                ) : (
                <Redirect
                    to={{
                    pathname: "/signIn",
                    }}
                />
                )
            }
            />
         )
      }}
    </Consumer>
  );
}
export default PrivateRoute;