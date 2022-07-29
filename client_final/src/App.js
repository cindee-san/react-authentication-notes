import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Public from './components/Public';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// Connect the Header component to context
// we've provided the Header component access to the data 
// and actions passed to <Context.Provider value={value}>.
const HeaderWithContext = withContext(Header);
// To display custom content in the private Authenticated component 
// (like a user's name and username), we'll need to subscribe the component to context.
const AuthWithContext = withContext(Authenticated);
// This connects the UserSignUp component to context. 
// In other words, UserSignUp is now a consuming component 
// that's subscribed to all context changes.
const UserSignUpWithContext = withContext(UserSignUp);
// subscribes (or connect) the UserSignIn component to context – 
// in other words, the data and actions to be shared 
// throughout the component tree.
const UserSignInWithContext = withContext(UserSignIn);
// subscribes the UserSignOut component to context changes, 
// that way we'll be able to reference the signOut action 
// (which calls the signOut function) from within the component.
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <div>
    {
      //because the header has context
    }
      <HeaderWithContext />

      <Switch>
      {
        //everyone begins here
      }
        <Route exact path="/" component={Public} />
        {
        // when authenticated, you go here, a protected route
        // if not logged in, will redirect them to signin page
        // has context
      }
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        {
        // when sign in is clicked
        // will read the context value passed to its provider
        // and render the page 
      }
        <Route path="/signin" component={UserSignInWithContext} />
        {
        // when sign up is clicked
        // will read the context value passed to its provider
        // and render the page 
      }
        <Route path="/signup" component={UserSignUpWithContext} />
        {
        // when sign out is clicked,
        // to render UserSignOutWithContext when the URL path is /signout:
      }
        <Route path="/signout" component={UserSignOutWithContext} />
        {
        // when route is not found, takes us here
      }
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
