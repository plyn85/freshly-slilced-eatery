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
  //get the users unique id
  let userId = localStorage.getItem("userId");
  console.log("u", userId);
  //convert to a number
  try {
    // get products data - note only one parameter in function call
    return await api.getDataAsync(
      `${api.BASE_URL}/cart/get-cart/?id=${userId}`
    );
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};
// End Function

// Get the cart
let deleteCartItem = async (id) => {
  const url = `${api.BASE_URL}/cart/${id}`;
  //http method
  let httpMethod = "DELETE";
  //build the request method
  const request = api.fetchInit(httpMethod);
  //console.log(request);

  if (confirm("Are you sure want to delete this meal from your cart?")) {
    try {
      // delete cartItem
      let result = await api.getDataAsync(url, request);
      return result;
    } catch (err) {
      // catch and log any errors
      console.log(err);
    }
  }
}; // End Functions

// Get the cart
let changeQuantity = async (mealData) => {
  const url = `${api.BASE_URL}/cart/increaseQty`;

  //http method
  let httpMethod = "PUT";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(mealData));

  try {
    // delete cartItem
    let result = await api.getDataAsync(url, request);
    return result;
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

//function to handle strip payments
let stripePayment = async (token) => {
  //get the current sessions cart id
  let cartId = localStorage.getItem("cartId");

  const url = `${api.BASE_URL}/cart/payment/${cartId}`;
  console.log("token", token);
  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(token));

  try {
    // stripe data
    let result = await api.getDataAsync(url, request);
    console.log(result);
    return result;
    // //and return true to stripeData.js
    // if (result) {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

// End Functions
export { getCartItems, getCart, deleteCartItem, changeQuantity, stripePayment };
