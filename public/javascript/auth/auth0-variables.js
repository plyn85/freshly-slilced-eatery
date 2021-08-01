// Declare constants for Auth0 details required in this app

// The Auth0 id for this app

const AUTH0_CLIENT_ID = "76lEw8KInuyDUC4biIRarqYE6X7Gmjxg";

// Your Auth0 domain aka account/ tenant

const AUTH0_DOMAIN = "dev-xfqn7pd8.eu.auth0.com";

// Users of this app require access to the API, identified by...

// This value is the 'Identifier' in your API settings

const AUDIENCE = "https://freshlyapi.com";

// Where Auth0 should return the token to after authentication

const AUTH0_CALLBACK_URL = "http://localhost:3000/order.html";

// Initialise Auth0 connection with parameters defined above

const auth0WebAuth = new auth0.WebAuth({
  domain: AUTH0_DOMAIN,

  clientID: AUTH0_CLIENT_ID,

  redirectUri: AUTH0_CALLBACK_URL,

  responseType: "id_token token",

  audience: AUDIENCE,
});

const auth0Authentication = new auth0.Authentication(auth0WebAuth, {
  domain: AUTH0_DOMAIN,

  clientID: AUTH0_CLIENT_ID,
});

// Exports

export { auth0WebAuth, auth0Authentication };
