/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key //customerOrder
 * @param {String} key   The localStorage() value object key//invoice_num
 * @param {String} value The localStorage() value object value
 */
let addToLocalStorageObject = function (name, key, value) {
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

export { addToLocalStorageObject };
