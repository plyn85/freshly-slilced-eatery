// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPI.js";

// send the collection data
let addCustomerInfo = async (customerData) => {
  const url = `${api.BASE_URL}/cart/collection`;
  console.log(customerData);
  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(customerData));
  try {
    // delete cartItem
    let result = await api.getDataAsync(url, request);
    //if the result comes back
    //return true to collection data js
    if (result != null) {
      return result;
    }
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

export { addCustomerInfo };
