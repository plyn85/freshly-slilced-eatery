// import everything from fetchAPI.js
// This will allow resources to be referenced as api.BASE_URL, etc.
import * as api from "./fetchAPI.js";

// send the collection data
let addCollectionInfo = async (collectionData) => {
  const url = `${api.BASE_URL}/cart/collection`;

  //http method
  let httpMethod = "POST";
  //build the request method
  const request = api.fetchInit(httpMethod, JSON.stringify(collectionData));

  try {
    // delete cartItem
    let result = await api.getDataAsync(url, request);
    return result;
  } catch (err) {
    // catch and log any errors
    console.log(err);
  }
};

export { addCollectionInfo };
