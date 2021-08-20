import * as api from "./fetchAPI.js";
import * as helperFunctions from "../helper_functions/helpers.js";

//function to handle strip payments
let stripePayment = async (token) => {
  //get the user id form local storage
  let userId = helperFunctions.getObjectFromLocalStorage("userId");
  const url = `${api.BASE_URL}/cart/payment/${userId}`;
  // console.log("token", token);
  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(token));

  try {
    // stripe data
    let result = await api.getDataAsync(url, request);
    //check the result of the API call
    if (helperFunctions.checkFetchRequestResult(result)) {
      //add the invoice number to local storage
      helperFunctions.addToLocalStorageObject(
        "customerOrder",
        "invoice_number",
        result.invoice_num
      );
      //add the amount charged to local storage
      helperFunctions.addToLocalStorageObject(
        "customerOrder",
        "amount",
        result.amount_charged
      );
      //reset the user id to 0
      helperFunctions.addObjectToLocalStorage("userId", 0);
      return true;
    } else return false;
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

//exports
export { stripePayment };
