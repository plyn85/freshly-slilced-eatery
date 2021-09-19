//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_snackbar

/**
 * shows a toast popup
 * @param {String} toastId  the element of the id of the toast div
 */
let showToast = (toastId) => {
  //get the element id
  let getToastId = document.getElementById(toastId);
  //add the show class
  getToastId.classList.add("showSnackBar");
  //remove the class after 5 secs
  setTimeout(() => {
    getToastId.classList.remove("showSnackBar");
  }, 3000);
};
//end function

/**
 * shows a toast popup to confirm an action
 * @param {String} toastId the element of the id of the toast div
 * @param {String} btnId the element of the id of the event listener
 */
let showToastToConfirm = (toastId) => {
  //get element ids
  let getToastId = document.getElementById(toastId);
  //show the toast alert
  getToastId.classList.add("show");
  return true;
};

//to confirm the action
let deleteConfirmed = (toastId, btnId) => {
  let getBtnId = document.getElementById(btnId);
  let getToastId = document.getElementById(toastId);
  //when the show even occurs
  getToastId.addEventListener("shown.bs.toast", function () {
    //after the toast is shown check if the deletion has been confirmed
    getBtnId.addEventListener("click", function () {
      //return true if it has
      return true;
    });
  });
};

//end function
export { showToast, showToastToConfirm, deleteConfirmed };
