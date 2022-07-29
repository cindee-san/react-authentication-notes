import React from 'react';

// extract the context property from props in the function's parameters
export default ({ context  }) => {
  // Store the authenticatedUser data in a variable named authUser
  const authUser = context.authenticatedUser;
  return (
    // display the authenticated user's name in the heading, 
    // and the username in a paragraph, 
    // using the name and username properties provided by context
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.name} is authenticated!</h1>
      <p>Your username is {authUser.username}.</p>
    </div>
  </div>
  );
}