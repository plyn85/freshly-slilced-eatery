// Get User log in status and update Login links.

// Assign event listeners to login, logout, and profile links

// Import dependencies required to manage user login, etc.
//public\javascript\auth\authO-variables.js
import {
  auth0WebAuth,
  auth0Authentication,
} from "../../auth/authO-variables.js";

import {
  getAccessToken,
  checkSession,
  saveAuthResult,
  checkStatus,
} from "../../auth/jwtAuth.js";

// Add Event Handlers for links

//

// Login event handler

// Call Auth0 to handle login (then return to the callback url – http://localhost:3000)

document.getElementById("login").addEventListener(
  "click",
  function () {
    // Call the Auth0 authorize function

    // auth0WebAuth is defined in auth0-variables.js

    auth0WebAuth.authorize({ returnTo: auth0WebAuth.redirectUri });

    console.log("Logged in");
  },
  false
);

// get user profile from Auth0

document.getElementById("get-profile").addEventListener(
  "click",
  async function (event) {
    event.preventDefault();

    auth0Authentication.userInfo(getAccessToken(), (err, usrInfo) => {
      if (err) {
        // handle error

        console.error("Failed to get userInfo");

        return;
      }

      // Output result to console (for testing purposes)

      console.log(usrInfo);

      document.getElementById("results").innerHTML = `<pre>${JSON.stringify(
        usrInfo,
        null,
        2
      )}</pre>`;
    });
  },
  false
);

// When page is loaded

window.onload = (event) => {
  // Check for valid Auth0 token

  auth0WebAuth.parseHash(function (err, result) {
    if (result) {
      saveAuthResult(result);
    }
  });
};
