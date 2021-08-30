//imports
import * as helperFunctions from "../helper_functions/helpers.js";
import { checkStatus } from "../auth/jwtAuth.js";
//get the user address info
let addressInfo = document.getElementById("address");

//function to get address info
let getAddressInfo = async () => {
  helperFunctions.addToLocalStorageObject(
    "customerOrder",
    "address",
    addressInfo.value
  );

  //alert the user that there address has been added
  if (localStorage.getItem("customerOrder") != null) {
    alert("Your delivery information has been added");
    //send the user to the menu page
    window.location.replace("menu.html");
  } else {
    //reset the form
    delForm.reset();
  }
};

//add the address info to address field after login
let addAddressInfoAfterLogin = () => {
  //get the customerOrder form local storage
  let customerOrder =
    helperFunctions.getObjectFromLocalStorage("customerOrder");
  //then add the address to the enter address box
  addressInfo.value = customerOrder.address;
};

//check if the user is logged in
let checkUserIsLoggedIn = () => {
  //if the user logged in checkStatus will return true
  if (checkStatus) {
    //call the function to add address
    addAddressInfoAfterLogin();
  }
};
//call the function to check if the user is logged in
checkUserIsLoggedIn();
//
//function to add the collection option to local storage
let addCollectionOptionDelPage = () => {
  //add the collection option to the customerOrder object
  helperFunctions.addToLocalStorageObject("customerOrder", "collection", true);
};
//add the event listeners

document
  .getElementById("submitBtnDel")
  .addEventListener("click", getAddressInfo);
//for the collection option
document
  .getElementById("collectionOptionDelPage")
  .addEventListener("click", addCollectionOptionDelPage);
