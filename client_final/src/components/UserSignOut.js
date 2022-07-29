import React from 'react';
import { Redirect } from 'react-router-dom';

// component calls signOut and updates state after render
export default ({context}) => {
  useEffect( () => context.actions.signOut());

  // Return a <Redirect> component that redirects the user 
  // to the root path ('/')
  return (
    <Redirect to="/" />
  );
}
