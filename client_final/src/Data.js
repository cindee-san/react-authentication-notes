import config from './config';

export default class Data {
  //used to make the GET and POST requests to the REST API.
  // accepts an API endpoint as its first argument (path), followed by 
  // the HTTP method, and body, 
  // which will contain any data associated with the request.
  // it will take two additional arguments that indicate if the request 
  // requires authentication and the credentials of the user.
  // initialize the parameters with default values in case 
  // no values or undefined gets passed for either.
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    // configures the request path using the base URL defined in config.js
    // gets passed to the returned fetch() method.
    const url = config.apiBaseUrl + path;
  
    // options object sends a request with the HTTP method, 
    // as well as the request headers and a stringified body 
    // (if body is provided).
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
     // Check if auth is required
    if (requiresAuth) { 
      // use btoa() to encode the username and password credentials 
      // passed to the api() method. 
      // Be sure to separate each property with a colon (:)
      // The credentials will be passed as an object 
      // containing username and password properties. 
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
      //  set an Authorization header on each request 
      // that requires authentication 
      // by adding an Authorization property to the headers object
      // Using a template literal, set the Authorization type to Basic, 
      // followed by the encoded credentials, 
      // stored in the variable encodedCredentials
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    // fetch() accepts an optional second parameter: a configuration 
    // object that lets you control a number of different settings 
    // you can apply to the request.
    return fetch(url, options);
  }

  // performs async operation to get an authenticated user
  // accepts arguments for username and password 
  // now that it's passing that data to api()
  async getUser(username, password) {
    // makes a GET request to the /users endpoint
    // Set requiresAuth to true and credentials should be an object 
    // containing the username and password information passed to getUser
    
    const response = await this.api(`/users`, 'GET', null, true, { username, password });
    // if the response status is 200,
    // returns a JSON object containing user credentials
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // performs async operation to create an authenticated user
  async createUser(user) {
    // makes a POST request to the /users endpoint
    const response = await this.api('/users', 'POST', user);
     // if the response status is 200,
    // returns an empty array
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
