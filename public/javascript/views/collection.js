//imports
import { validateForm } from "../validation/formValidation.js";
import { addCustomerInfo } from "../dataAccess/collectionData.js";
import { CustomerForm } from "../models/customerForm.js";

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

//adds the current date and time to first option in selected box
// automatically updated every 15 mins
let getCurrentDayAndTime = () => {
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

let getCustomerForm = () => {
  //get values from collection form
  let collectionTime = document.getElementById("collectionTime").value;
  let message = document.getElementById("message").value;
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  ///validate the form inputs
  let validatedInputs = validateForm(collectionTime, name, email, message);

  // //if the validation returns true
  if (validatedInputs) {
    //create the form instance
    return new CustomerForm(
      // read the form values and pass to the contact constructor
      name,
      email,
      collectionTime,
      message
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
    // and returned customer info to local storage
    let customer = JSON.stringify(result);
    window.localStorage.setItem("customer", customer);
    //and send the customer to the payments page
    window.location.replace("checkout.html");
  } else {
    alert("your information was not submitted");
  }
}; // End Function

document
  .getElementById("submitBtn")
  .addEventListener("click", sendCustomerForm);

//call the checkDel function
checkDel();
let colOrDel = document.getElementById("collectOrDel");
let delOption = document.getElementById("deliveryOption");
let colOption = document.getElementById("collectionOption");
let addressField = document.getElementById("addressField");
delOption.addEventListener("click", function () {
  colOrDel.innerHTML = `delivered`;
  colOption.checked = false;
  addressField.classList.remove("hide");
});

colOption.addEventListener("click", function () {
  colOrDel.innerHTML = `collected`;
  delOption.checked = false;
  addressField.classList.add("hide");
});
