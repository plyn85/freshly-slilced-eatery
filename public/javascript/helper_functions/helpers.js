/**
 * Add an item to a localStorage() object
 * @param {String} name  The localStorage() key //customerOrder
 * @param {String} key   The localStorage() value object key//invoice_num
 * @param {String} value The localStorage() value object value
 */
let addToLocalStorageObject = function (name, key, value) {
  // Get the existing data
  var existing = localStorage.getItem(name);

  //convert the localStorage string to an object
  existing = JSON.parse(existing);

  // Add new data to localStorage object
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
};
//end function

export { addToLocalStorageObject };
