//get the id of the contact form
let contactForm = document.getElementById("submitContactForm");

/* this function will
   validate the contact form
   */

function validateForm(collectionTimeMenu, message) {
  // //for first name
  // if (firstName == "") {
  //   alert("Please enter a value for first name");
  //   // Ensures form is not submitted
  //   return false;
  // }

  // For message box
  if (message == "") {
    confirm("you have not entered a message do you wish to continue?");
    if (!confirm) {
      return false;
    }
  }

  if (collectionTimeMenu == "") {
    alert("you have not entered a delivery time");
    return false;
  }
  // //regular expression for email
  // let regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // //for email
  // if (!regularExpressionEmail.test(emailAddress)) {
  //   alert("You email is invalid");
  //   return false;
  // }
  else {
    //if the all pass return true
    return true;
  }
}
export { validateForm };
