// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.

import * as api from "./fetchAPI.js";

//
// Get all meals
let getMeals = async () => {
  try {
    // get meals data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/meals`);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
}; // End Functions

// Get all meals
let addMealToCart = async (mealData) => {
  //http method is post
  let httpMethod = "POST";
  //build the request object
  const request = api.fetchInit(httpMethod, JSON.stringify(mealData));
  console.log(request);

  try {
    // get meals data - note only one parameter in function call
    let responseUserId = await api.getDataAsync(
      `${api.BASE_URL}/cart`,
      request
    );
    console.log(responseUserId);
    //if its a sting the id has been sent
    if (typeof responseUserId.user_id == "string") {
      alert("true");
      //add the uniqueId to session storage
      localStorage.setItem("userId", JSON.stringify(responseUserId.user_id));
      return true;
    } else {
      return false;
    }
  } catch (err) {
    //catch the errors
    // catch and log any errors
    console.log(err);
  }
}; // End Functions
export { getMeals, addMealToCart };
