import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      name,
      username,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="name" 
                  name="name" 
                  type="text"
                  value={name} 
                  onChange={this.change} 
                  placeholder="Name" />
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
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
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
    // use destructuing assingment to extract the context prop
    // from this.props
    const { context } = this.props;
    // unpack the name, username and password properties 
    // from the state object
    // into their own variables
    const {
      name,
      username,
      password,
    } = this.state;

    // Create user
    // uses the ES2015 object shorthand syntax to include 
    // just the key names because the values have the same name as the keys.
    const user = {
      name,
      username,
      password,
    };

    // the destructured context variable 
    // allows us to call the createUser() method
    // The authentication API utilities provided to app 
    // are available via the context.data property.
    // createUser() accepts one argument, which is the new user payload
    // which is passed as an argument
    // createUser() is an asynchronous operation that returns a promise. 
    // The resolved value of the promise is either an array of errors
    // (sent from the API if the response is 400), 
    // or an empty array (if the response is 201).
    // see createUser() method in app.js
    context.data.createUser(user)
    //we'll check if the returned PromiseValue is an array of errors. 
    // If it is, we will set the errors state of 
    // the UserSignUp class to the returned errors.
      .then( errors => {
        if (errors.length) {
          // to update the errors state to the returned errors
          this.setState({ errors });
        } else {
          // If the response returns no errors (or an empty array) 
          // it means that a new user was successfully created 
          // and sent to the server.
         
          context.actions.signIn(username, password)
          // once user is authenticated, it will navigate the user
          // to the /authenticated URL path.
            .then(() => {
              this.props.history.push('/authenticated');    
            });
        }
      })
      .catch((err) => {
        // that way we can immediately see the reason 
        // why the promise was rejected:
        console.log(err);
        // In other words, redirect the user to another route. 
        // Navigating to the /error route will display a "Not Found" 
        // message in the browser
        // push to history stack 
        this.props.history.push('/error');
      });
  
  }

  cancel = () => {
    // redirect them back to the home route upon clicking "Cancel".
    // push the root path ('/') onto the history stack
   this.props.history.push('/');
  }
}
