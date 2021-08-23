// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPI.js";
import * as helperFunctions from "../helper_functions/helpers.js";

// send the collection data
let addCustomerOrderData = async (customerOrderData) => {
  const url = `${api.BASE_URL}/user/create-customer-order`;

  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(customerOrderData));
  try {
    // delete cartItem
    let result = await api.getDataAsync(url, request);

    //if the request is successful
    if (helperFunctions.checkFetchRequestResult(result)) {
      //add the returned data to local storage
      helperFunctions.addObjectToLocalStorage("customerOrder", result);
      //return true to the stipe page as the order is complete
      return true;
    } else return false;
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

export { addCustomerOrderData };
