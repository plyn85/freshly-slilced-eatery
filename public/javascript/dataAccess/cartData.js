// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPI.js";

//
// Get all cartItems
let getCartItems = async () => {
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/cart`);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
}; // End Function

// Get the cart
let getCart = async () => {
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/cart/get-cart`);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};
// End Function

// Get the cart
let deleteCartItem = async (mealId) => {
  // console.log(mealId);
  //http method
  let httpMethod = "DELETE";
  //build the request method
  const request = api.fetchInit(httpMethod);
  console.log(request);
  try {
    // delete cartItem
    return await api.getDataAsync(`${api.BASE_URL}/cart/${mealId}`, request);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
}; // End Functions
export { getCartItems, getCart, deleteCartItem };
