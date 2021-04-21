//imports
import { validateForm } from "../validation/formValidation.js";
import { addCollectionInfo } from "../dataAccess/collectionData.js";
import { CollectionForm } from "../models/collectionForm.js";

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
  ).innerHTML = `${currentDayOfWeek} ${hours}:${mins}`;
};
getCurrentDayAndTime();
// //calls the function every 15 mins
let interval = window.setInterval(getCurrentDayAndTime, 900000);

let getCollectionForm = () => {
  let collectionForm;
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
    collectionForm = new CollectionForm(
      // read the form values and pass to the contact constructor
      collectionTime,
      name,
      email,
      message
    );
  } else {
    console.log("form validation failed");
  }
  return collectionForm;
};

//send  the collection form
let sendCollectionForm = async () => {
  // Get the form data
  const collectionForm = getCollectionForm();
  //send to the collection info function
  const result = await addCollectionInfo(collectionForm);

  //if the result is true the send the user to payments page
  if (result) {
    window.location.replace("checkout.html");
  } else {
    alert("your order was not submitted");
  }
}; // End Function

document
  .getElementById("submitBtn")
  .addEventListener("click", sendCollectionForm);
