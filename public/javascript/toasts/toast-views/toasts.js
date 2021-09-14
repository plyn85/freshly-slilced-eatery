/**
 * shows a toast popup
 * @param {String} toastId  the element of the id of the event listener
 */
let showToast = (toastId) => {
  let getToastId = document.getElementById(toastId);
  let toastsContainer = document.getElementsByClassName("toastsContainer");
  let toastAlert = new bootstrap.Toast(getToastId);
  toastAlert.show();
  toastsContainer.classList.add("show");
};

export { showToast };
