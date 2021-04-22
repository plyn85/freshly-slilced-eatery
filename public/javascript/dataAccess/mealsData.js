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
  //get the user id if it exists in localStorage
  if (typeof localStorage.getItem("userId") == "string") {
    //if it does add to mealData to be sent it the request body
    mealData.user_id = JSON.parse(localStorage.getItem("userId"));
  }
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
      //add the uniqueId to session storage and return true
      localStorage.setItem("userId", JSON.stringify(responseUserId.user_id));
    }
    // if the response is false the item is already in the cart
    else if (responseUserId == false) {
      alert("That item is already in your cart");
    }
    //if the response is either true or a sting an item has been added to the cart
    else {
      alert("A meal has been added to your cart");
    }
  } catch (err) {
    //catch the errors
    // catch and log any errors
    console.log(err);
  }
}; // End Functions
export { getMeals, addMealToCart };
