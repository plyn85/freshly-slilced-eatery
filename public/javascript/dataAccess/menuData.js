//imports
import * as api from "./fetchAPI.js";
import {
  getObjectFromLocalStorage,
  addObjectToLocalStorage,
  checkFetchRequestResult,
} from "../helper_functions/helpers.js";
//
//
let getMeals = async () => {
  try {
    // get meals data
    return await api.getDataAsync(`${api.BASE_URL}/meals`);
  } catch (err) {
    console.log(err);
  }
};
// End Function

let addMealToCart = async (mealData) => {
  //get the user id if it exists in localStorage
  if (typeof localStorage.getItem("userId") == "string") {
    //if it does add to mealData to be sent it the request body
    mealData.user_id = JSON.parse(localStorage.getItem("userId"));
  }

  let httpMethod = "POST";
  //build the request object
  let request = api.fetchInit(httpMethod, JSON.stringify(mealData));

  try {
    // get meals data - note only one parameter in function call
    let responseUserId = await api.getDataAsync(
      `${api.BASE_URL}/cart`,
      request
    );
    if (checkFetchRequestResult(responseUserId)) {
      //add the uniqueId to session storage and return true
      addObjectToLocalStorage("userId", responseUserId.user_id);
    }
    // if the response is false the item is already in the cart
    if (responseUserId == false) {
      alert("That item is already in your cart");
    } else {
      alert("A meal has been added to your cart");
    }
    //return the response to menu.js
    return responseUserId;
  } catch (err) {
    console.log(err);
  }
};

// End Functions
//imports
export { getMeals, addMealToCart };
