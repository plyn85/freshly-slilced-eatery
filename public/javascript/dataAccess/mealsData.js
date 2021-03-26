// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPI.js";

//
// Get all products
let getMeals = async () => {
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/meals`);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
}; // End Functions

export { getMeals };
