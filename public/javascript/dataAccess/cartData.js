// imports
import * as api from "./fetchAPI.js";
import * as helperFunctions from "../helper_functions/helpers.js";

//
// Get all cartItems
let getCartItems = async () => {
  //get the users unique id
  let userId = JSON.parse(localStorage.getItem("userId"));
  try {
    // get cartItems data - note only one parameter in function call
    return await api.getDataAsync(`${api.BASE_URL}/cart/?id=${userId}`);
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
}; // End Function

// Get the cart
let getCart = async () => {
  let userId = JSON.parse(localStorage.getItem("userId"));
  //convert to a number
  try {
    // get cart data - note only one parameter in function call
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
  let userId = JSON.parse(localStorage.getItem("userId"));
  const url = `${api.BASE_URL}/cart/${id}/${userId}`;
  //http method
  let httpMethod = "DELETE";
  //build the request method
  const request = api.fetchInit(httpMethod);
  //console.log(request);

  if (confirm("Are you sure want to delete this meal from your cart?")) {
    try {
      // delete cartItem
      const result = await api.getDataAsync(url, request);
      //return the if its true
      if (result) {
        alert("item deleted");
      }
      //if the result is zero cart is deleted
      if (result === 0) {
        alert("you cart is empty");
        //remove the userId in local storage
        window.localStorage.removeItem("userId");
        //and create a new one thats zero as this will never be a real userId
        window.localStorage.setItem("userId", 0);
      }
      return result;
      // return result;
    } catch (err) {
      // catch and log any errors
      console.log(err);
    }
  }
}; // End Functions

// Get the cart
let changeQuantity = async (mealData) => {
  //get the user id form local storage
  let userId = JSON.parse(localStorage.getItem("userId"));
  //add to the mealData object
  mealData.user_id = userId;
  //console.log(mealData);
  //build the url
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
  let userId = localStorage.getItem("userId");

  const url = `${api.BASE_URL}/cart/payment/${userId}`;
  console.log("token", token);
  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(token));

  try {
    // stripe data
    let result = await api.getDataAsync(url, request);
    //unless false is returned the payment was a success and an object with
    // charge information is returned
    if (result == false) {
      return false;
    } else {
      let customerOrder = "customerOrder";
      //add the invoice number to local storage
      helperFunctions.addToLocalStorageObject(
        customerOrder,
        "invoice_number",
        result.invoice_num
      );
      //add the amount charged to local storage
      helperFunctions.addToLocalStorageObject(
        customerOrder,
        "amount",
        result.amount_charged
      );
      //reset the user id to 0
      localStorage.setItem("userId", JSON.stringify(0));
      return true;
    }

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
