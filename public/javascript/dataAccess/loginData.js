// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.

import * as api from "./fetchAPI.js";

//function calls the login Api route
let callLoginApi = async (url) => {
  console.log(url);
  try {
    console.log("got here");
    // call the login Api route
    const result = await api.getDataAsync(`${api.BASE_URL}/user/login`);
    console.log(result);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};
//exports

export { callLoginApi };
