//imports
import { validateForm, validateAddress } from "../validation/formValidation.js";
import { CustomerForm } from "../models/customerForm.js";
import * as helperFunctions from "../helper_functions/helpers.js";
import { checkStatus } from "../auth/jwtAuth.js";
//get the id for the delivery and collection option events
// and form submit button
let colOrDel = document.getElementById("collectOrDel");
let delOption = document.getElementById("deliveryOption");
let colOption = document.getElementById("collectionOption");
let addressField = document.getElementById("addressFieldDiv");
let address = document.getElementById("address");
let subBtn = document.getElementById("submitBtn");
//get ids from the collection form
let collectionOrDeliveryTime = document.getElementById("collectionTime");
let message = document.getElementById("message");
let name = document.getElementById("name");
let email = document.getElementById("email");

//get the customer form values
let getCustomerForm = () => {
  //get the values from the form
  let collectionOrDeliveryTimeValue = collectionOrDeliveryTime.value;
  let messageValue = message.value;
  let nameValue = name.value;
  let addressValue = address.value;
  let emailValue = email.value;
  // this remains true unless false is returned from the validator
  let validatedAddress = true;
  //both delivery and collection set to false;
  let delivery = false;
  let collection = false;
  ///validate the form inputs
  let validatedInputs = validateForm(
    collectionOrDeliveryTimeValue,
    nameValue,
    emailValue,
    messageValue
  );
  //check if the delivery option has been selected
  if (delOption.checked == true) {
    //validate address
    validatedAddress = validateAddress(addressValue);
    //set delivery to true;
    delivery = true;
  }
  //if the option was not chosen then the collection option was
  else {
    //so set the collection to true;
    collection = true;
  }
  //if the validation returns true
  if ((validatedInputs, validatedAddress)) {
    //create the form instance
    return new CustomerForm(
      // read the form values and pass to the contact constructor
      nameValue,
      emailValue,
      collectionOrDeliveryTimeValue,
      addressValue,
      messageValue,
      collection,
      delivery
    );
  } else {
    console.log("form validation failed");
  }
};

//send  the collection form
let addCustomerInfoToLocalStorage = async () => {
  // Get the form data
  const customerOrder = getCustomerForm();
  //add the order to local storage
  helperFunctions.addObjectToLocalStorage("customerOrder", customerOrder);
  //and send the customer to the payments page
  window.location.replace("checkout.html");
}; // End Function

//function if delivery option is selected
let delOptionSelected = () => {
  colOrDel.innerHTML = `delivered`;
  colOption.checked = false;
  delOption.checked = true;
  addressField.classList.remove("hide");
};

//function if collection option is selected
let colOptionSelected = () => {
  colOrDel.innerHTML = `collected`;
  delOption.checked = false;
  addressField.classList.add("hide");
};

//
//adds customer info to form if they are logged in
let addCustomerInfoAfterLogin = () => {
  //get the customerOrder form local storage
  let customerOrder =
    helperFunctions.getObjectFromLocalStorage("customerOrder");
  //then add the name email and address to the enter address box
  name.value = customerOrder.name;
  email.value = customerOrder.email;
  //check if the address key exists
  if (Object.keys(customerOrder.address)) {
    address.value = customerOrder.address;
    //call the delOptionSelected function so the address displays
    delOptionSelected();
  }
};

//check if the user is logged in
let checkUserIsLoggedIn = () => {
  //if the user logged in checkStatus will return true
  if (checkStatus) {
    //call the function to add address
    addCustomerInfoAfterLogin();
  }
};

//
//add the event listeners
delOption.addEventListener("click", delOptionSelected);
colOption.addEventListener("click", colOptionSelected);
subBtn.addEventListener("click", addCustomerInfoToLocalStorage);

//function gets the current day and time
let getCurrentDayAndTime = helperFunctions.getCurrentDayAndTime("firstOption");
//calls the function every 15 mins
let interval = window.setInterval(getCurrentDayAndTime, 900000);

//exports
export { checkUserIsLoggedIn };
