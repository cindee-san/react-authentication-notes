import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

// The function first destructures and renames the component prop 
// in its parameters. It also collects any props that get passed to it
// in a ...rest variable:
export default ({ component: Component, ...rest }) => {
  return (
    // the <Consumer> component subscribes PrivateRoute 
    // to all the actions and data provided by Context.js
    <Consumer>
      {context => (
        <Route
          {...rest}
          {
            // check whether or not the user is authenticated 
            // (there is an authenticated user in state)
          }
          render={props => context.authenticatedUser ? (
            {
              // If the user is authenticated, the component specified 
              // in <PrivateRoute>'s component prop gets rendered.
            }
              <Component {...props} />
            ) : (
                {
                  // If the user not authenticated, redirect to /signin
                  // To redirect an unauthenticated user to the "Sign In" page, 
                  // pass the object a pathname property and set the value to '/signin'
                  // Pass a state property whose value is the current location 
                  // of the route the user tried to access
                  // Since pathname: '/signin' renders the UserSignIn component 
                  // on redirect, you can access from via this.props.location.state.from 
                  // within the UserSignIn component.
                }
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
              }} />
            )
          }
        />
    )}
    </Consumer>
  );
};