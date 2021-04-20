//imports
import { validateForm } from "../validation/formValidation.js";
import { addCollectionInfo } from "../dataAccess/collectionData.js";

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

let submitCollection = async () => {
  //get the value of dropdown menu and convert to number
  let collectionTimeMenu = document.getElementById("collectionTime").value;

  //get the text of the message box
  let message = document.getElementById("message").value;
  // validate the message and delivery time
  let validatedInputs = validateForm(collectionTimeMenu, message);
  //if the are validated
  if (validatedInputs) {
    //create and object with the values
    let collectionData = {
      collectionTimeMenu: collectionTimeMenu,
      message: message,
    };
    //pass in the values add collection info function
    const result = await addCollectionInfo(collectionData);
  } else {
    alert("your order was not submitted");
  }
};

document
  .getElementById("submitBtn")
  .addEventListener("click", submitCollection);
