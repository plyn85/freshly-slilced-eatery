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

/**
 * Add an item to a localStorage() object
 * @param {String} objName  The localStorage() object name
 * @param {obj} mealData  The mealData object to be added to local storage
 *
 */
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
    existing = [];
    existing.push(mealData);
    localStorage.setItem(objName, JSON.stringify(existing));
  }
  //get the navCartObject
  let navTotal = getObjectFromLocalStorage("navCartTotal");
  if (navTotal != null) {
    //increase the navCartTotal by one if it exists
    navTotal++;
  } else {
    //and set it to one if it does not
    navTotal = 1;
  }
  //add the total
  addObjectToLocalStorage("navCartTotal", `${navTotal}`);
};
//end function

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
//end function

/**
 * Check the returned response is valid from the api call
 * @param {obj} fetchRequestResult  The fetchRequest result
 */
let checkFetchRequestResult = (fetchRequestResult) => {
  if (
    Object.entries(fetchRequestResult).length === 0 ||
    fetchRequestResult.message === "Failed to fetch"
  ) {
    return false;
  } else return true;
};
//end function

/**
 * changes the total of the navCart after the quantity button is clicked
 * @param {Number} mealId  the mealId of the meal that has been deleted
 * @param {String} value  the value of the quantity button (+ or -)
 */
let changeNavCartTotal = (mealId, value) => {
  //get the objects from local storage
  let navTotal = getObjectFromLocalStorage("navCartTotal");
  let mealData = getObjectFromLocalStorage("mealData");
  //loop through the mealData
  mealData.forEach((item) => {
    //if the meal id matches the item id
    if (item._id == mealId) {
      //check the value
      if (value == "+") {
        //increase the quantity
        item.quantity++;
        //decrease the navCartTotal
        navTotal++;
      } else if (value == "-") {
        //decrease the quantity
        item.quantity--;
        //decrease the navCartTotal
        navTotal--;
      }
      //if the quantity of an item reaches zero delete the item
      if (item.quantity == 0) {
        mealData.splice(mealData.indexOf(item), 1);
      }
    }
  });
  console.log({ mealData });
  //add objects back to local storage
  addObjectToLocalStorage("navCartTotal", navTotal);
  addObjectToLocalStorage("mealData", mealData);
};
//end function

/**
 * changes the total of the navCart after an item is deleted
 * @param {Number} mealId  the mealId of the meal that has been deleted
 */

let changeNavCartTotalAfterItemDeleted = (mealId) => {
  //variables
  let quantity = 0;
  //get the meal data and navTotal
  let mealData = getObjectFromLocalStorage("mealData");
  let currentNavTotal = getObjectFromLocalStorage("navCartTotal");
  //loop through the meal data
  mealData.forEach((item) => {
    //if the meal id matches the item id
    if (mealId == item._id) {
      //get the quantity of the item
      quantity = item.quantity;
      //remove the item
      mealData.splice(mealData.indexOf(item), 1);
    }
  });
  //delete the quantity from the nav total
  let newNavTotal = currentNavTotal - quantity;
  //add the new navTotal to local storage
  addObjectToLocalStorage("navCartTotal", newNavTotal);
  addObjectToLocalStorage("mealData", mealData);
};
//end function

/**
 * removes an object from local storage
 * @param {String} objectName  the name of the object to be removed
 */

let removeFromLocalStorage = (objectName) => {
  localStorage.removeItem(objectName);
};
//end function

/* gets the current day and time
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

//exports
export {
  addToLocalStorageObject,
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  checkFetchRequestResult,
  getCurrentDayAndTime,
  changeNavCartTotal,
  addMealToLocalStorage,
  changeNavCartTotalAfterItemDeleted,
  removeFromLocalStorage,
};
