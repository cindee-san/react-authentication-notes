import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    // The value of authUser is either an object holding 
    // the authenticated user's name and username values, or null
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">MyAuth</h1>
          <nav>
          {
            // use a conditional (ternary) operator to render content 
            // representing the current state, 
            // using the value of authUser as the condition
            // If authUser evaluates to a truthy value 
            // (there is an authenticated user in state), 
            // the Header class renders a <span> element containing 
            // a "Welcome" message that displays the user name.
          }
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                {
                  //navigates user to the path /signout
                }
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
              {
                // If authUser is falsy (the authenticatedUser state is null, 
                // for example), the Header class renders the default navigation, 
                // displaying the "Sign Up" and "Sign In" links:
              }
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">Sign Up</Link>
                <Link className="signin" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};
