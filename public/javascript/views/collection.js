//imports
import { validateForm, validateAddress } from "../validation/formValidation.js";
import { addCustomerInfo } from "../dataAccess/collectionData.js";
import { CustomerForm } from "../models/customerForm.js";

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
let sendCustomerForm = async () => {
  // Get the form data
  const customerForm = getCustomerForm();
  //send to the collection info function
  const result = await addCustomerInfo(customerForm);
  //if the result is not empty
  if (result != null) {
    // add returned customer info to local storage
    let customer = JSON.stringify(result);
    window.localStorage.setItem("customer", customer);
    //and send the customer to the payments page
    window.location.replace("checkout.html");
  } else {
    alert("your information was not submitted please try again");
  }
}; // End Function

//function if delivery option is selected
let delOptionSelected = () => {
  colOrDel.innerHTML = `delivered`;
  colOption.checked = false;
  addressField.classList.remove("hide");
};

//function if collection option is selected
let colOptionSelected = () => {
  colOrDel.innerHTML = `collected`;
  delOption.checked = false;
  addressField.classList.add("hide");
};
// //write a function to fill confirm collection form for the user if that option is chosen
let addCustomerInfoToForm = () => {
  //get the customers info from local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  //add the info to the form fields
  //check the fields are not undefined
  if (obj.name != undefined && obj.email != undefined) {
    name.value = `${obj.name}`;
    email.value = `${obj.email}`;
  }
  //check if the user chose the delivery option or an address has been added
  if (obj.delivery == "yes" || obj.address != undefined) {
    //auto select the delivery option
    delOption.checked = true;
    //call the function for a selected delivery option
    delOptionSelected();
    address.value = `${obj.address}`;
  }
  //if they chose the collection option
  else if (obj.collection == "yes") {
    //auto select the selection option
    colOption.checked = true;

    //call the function for collection option selected
    colOptionSelected();
  }
  //add the delivery or collection time chosen
  //first loop through the select options
  for (let i = 0; i < collectionOrDeliveryTime.length; i++) {
    //if the select option is the same as one in local storage
    if (
      collectionOrDeliveryTime[i].value == `${obj.collection_delivery_time}`
    ) {
      //then select that option
      collectionOrDeliveryTime[i].selected = true;
    }
  }

  //check if the message is undefined
  if (obj.message != undefined) {
    //check if a message has been previously left
    if (obj.message != "no message") {
      //then fill the message with the previous message left
      message.value = obj.message;
    }
  }
};

//check if the user has chosen to fill the form
let checkUserOption = () => {
  //get the objects from local storage
  let fillFormObj = JSON.parse(window.localStorage.getItem("fillUserForm"));
  let customerObj = JSON.parse(window.localStorage.getItem("customer"));
  //check customer object is not null
  if (customerObj != null) {
    //and if it is not empty
    if (Object.entries(customerObj).length != 0) {
      //check the user has chosen to auto fill the form or if address has already been added from delivery.html
      if (fillFormObj || customerObj.address != "") {
        //if they have call the function the fills the form for them
        addCustomerInfoToForm();
      }
    }
  }
};

//call the check user option function
checkUserOption();
//add the event listeners
delOption.addEventListener("click", delOptionSelected);
colOption.addEventListener("click", colOptionSelected);
subBtn.addEventListener("click", sendCustomerForm);

//adds the current date and time to first option in selected box
// automatically updated every 15 mins
let getCurrentDayAndTime = () => {
  //add the days of the week to an array
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //constants and variables
  let currentDayOfWeek;
  //get the date
  let currentDate = new Date();
  //get the day
  let currentDay = currentDate.getDay();
  //loop through the array and get the day
  for (let day in weekDays) {
    //match to the current day
    if (day == currentDay) {
      currentDayOfWeek = weekDays[day];
    }
  }
  //get the current time
  let hours = currentDate.getHours();
  let mins = currentDate.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

  document.getElementById(
    "firstOption"
  ).innerHTML = `Today is ${currentDayOfWeek} It,s currently ${hours}:${mins}`;
};
//calls the function every time the page reloads
getCurrentDayAndTime();
// //calls the function every 15 mins
let interval = window.setInterval(getCurrentDayAndTime, 900000);
