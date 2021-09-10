//imports
import * as helperFunctions from "../helper_functions/helpers.js";

//function displays the navCartTotal from local storage

let displayNavCartTotal = async () => {
  //get the navCart total form localStorage
  let navCartTotal = helperFunctions.getObjectFromLocalStorage("navCartTotal");
  //check if the navCart total exists or is equal to zero
  if (navCartTotal != null) {
    //add the navCart to var
    let navCart = `${navCartTotal}`;

    //return the navCart to navigation bar
    return (document.getElementById("navCartTotal").innerHTML = navCart);
  }
};

//call the function
displayNavCartTotal();

//exports
export { displayNavCartTotal };
