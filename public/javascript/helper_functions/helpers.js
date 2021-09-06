/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object key
 * @param {String} value The localStorage() value object value
 */
let addToLocalStorageObject = (name, key, value) => {
  // Get the existing data
  let existing = localStorage.getItem(name);

  //convert the localStorage string to an object if it exists

  if (existing != null) {
    existing = JSON.parse(existing);
  }
  // it does not create the object
  else {
    existing = {};
  }
  // Add new data to localStorage object
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};
//end function
let addMealToLocalStorage = (objName, mealData) => {
  // Get the existing data
  let existing = JSON.parse(localStorage.getItem(objName));

  if (existing != null) {
    //add to the array of objects that exists
    existing.push(mealData);
    //then add to local storage
    localStorage.setItem(objName, JSON.stringify(existing));
  }
  // it does not create the object
  else {
    existing = [mealData];
    localStorage.setItem(objName, JSON.stringify(existing));
  }
};
/**
 * Add an object to local storage
 * @param {String} objName  The localStorage() object name
 * @param {obj} obj The localStorage() object
 */
let addObjectToLocalStorage = (objName, obj) => {
  localStorage.setItem(objName, JSON.stringify(obj));
};
//end function

/**
 * Get an  object to local storage
 * @param {String} objName  The localStorage() object name
 */
let getObjectFromLocalStorage = (objName) => {
  return JSON.parse(localStorage.getItem(objName));
};
/**
 * Check the returned response is valid from the api call
 * @param {obj} fetchRequestResult  The fetchRequest result
 */
let checkFetchRequestResult = (fetchRequestResult) => {
  if (
    Object.entries(fetchRequestResult).length === 0 ||
    fetchRequestResult.message === "Failed to fetch"
  ) {
    //console.log("The request was not successful");
    return false;
  } else return true;
};

/**
 * increase the total of the navCart
 */
let increaseNavCartTotal = () => {
  //increase the navCartTotal
  let navTotal = getObjectFromLocalStorage("navCartTotal");
  addObjectToLocalStorage("navCartTotal", `${++navTotal}`);
};

/**
 * increase the total of the navCart
 */
let decreaseNavCartTotal = () => {
  //increase the navCartTotal
  let navTotal = getObjectFromLocalStorage("navCartTotal");
  addObjectToLocalStorage("navCartTotal", `${--navTotal}`);
};

/**
 * gets the current day and time
 * @param {String} elementId  the Id of the element to add the current date and time to
 */
let getCurrentDayAndTime = (elementId) => {
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
    elementId
  ).innerHTML = `Today is ${currentDayOfWeek} It,s currently ${hours}:${mins}`;
};

//end function
export {
  addToLocalStorageObject,
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  checkFetchRequestResult,
  getCurrentDayAndTime,
  increaseNavCartTotal,
  decreaseNavCartTotal,
  addMealToLocalStorage,
};
