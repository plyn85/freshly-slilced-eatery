// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.

import * as api from "./fetchAPI.js";

//function calls the login Api route
let callLoginApi = async (url) => {
  console.log(url);
  try {
    // call the login Api route
    const result = await api.getDataAsync(`${api.BASE_URL}/user/login`);
    console.log(result);
    //add the email to customer object
    // let customer = {
    //   email: result.email,
    // };
    //add then add the customer object to local storage
    window.localStorage.setItem("customer", JSON.stringify(result));
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};
//exports

export { callLoginApi };
