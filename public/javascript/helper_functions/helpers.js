/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key
 * @param {String} key   The localStorage() value object
 * @param {String} value The localStorage() value object value
 */
let addToLocalStorageObject = (name, key, value) => {
  // Get the existing data
  let existing = localStorage.getItem(name);

  //convert the localStorage string to an object if it exists if
  // it does not create the object
  if (existing != null) {
    existing = JSON.parse(existing);
  } else {
    existing = {};
  }
  // Add new data to localStorage object
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
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

/**
 * Check the returned response is valid from the api call
 * @param {obj} fetchRequestResult  The fetchRequest result
 */
let checkFetchRequestResult = (fetchRequestResult) => {
  if (
    Object.entries(fetchRequestResult).length === 0 ||
    fetchRequestResult.message === "Failed to fetch"
  ) {
    console.log("The request was not successful");
    return false;
  } else return true;
};
//end function
export {
  addToLocalStorageObject,
  addObjectToLocalStorage,
  getObjectFromLocalStorage,
  checkFetchRequestResult,
};
