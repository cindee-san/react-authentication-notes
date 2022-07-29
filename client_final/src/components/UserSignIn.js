import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <input 
                  id="username" 
                  name="username" 
                  type="text"
                  value={username} 
                  onChange={this.change} 
                  placeholder="User Name" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />                
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    //use destructuring assignment to extract the context prop from this.props
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    // unpack the username and password properties from the state object
    // (this.state) into distinct variables 
    // these are the properties needed to sign in a user
    const { username, password } = this.state;
    // In Context.js, you passed Context.Provider a value prop 
    // whose value was an object with an actions property.
    // The signIn() function provided to the UserSignIn component 
    // is available via context.actions.signIn
    // accepts two arguments, username and password, 
    // to log in a registered user:
    context.actions.signIn(username, password)
    // Get the value out of the returned promise 
    // by chaining a then() method to signIn
      .then((user) => {
        // check if the returned PromiseValue is strictly equal to null 
        // (or a response of 400)
        if (user === null) {
          // set the errors state of the UserSignIn class 
          // to an array which holds the string 'Sign-in was unsuccessful' 
          // (this will be the validation message displayed to the user)
          this.setState(() => {
            return { errors: [ 'Sign-in was unsuccessful' ] };
          });
          // call this.props.history.push(), 
          // passing it '/authenticated' as the redirect route
        } else {
          // The from variable passed to history.push(from) contains information 
          // about the pathname an unauthenticated user redirected from 
          // (via this.props.location.state).
          this.props.history.push(from);
          //To view the authenticated username 
          // (and know that registration worked), log a "Success" message to the console 
          // that displays the username:
          console.log(`SUCCESS! ${username} is now signed in!`);
        }
      })
      // Pass catch() an arrow function that takes the parameter err 
      // (the rejection reason) and logs it to the console
      .catch((error) => {
        console.error(error);
        // use history and the push() method to navigate the user from 
        // /signin to /error, providing a user-friendly way 
        // to let them know that something went wrong:
        this.props.history.push('/error');
      });
  }

  cancel = () => {
    // redirect them back to the home route upon clicking "Cancel".
    // push the root path ('/') onto the history stack
    this.props.history.push('/');
  }
}
