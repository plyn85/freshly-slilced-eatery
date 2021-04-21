/* this function will
   validate the collection form
   */

function validateForm(collectionTime, name, email, message) {
  console.log(collectionTime, name, email, message);
  //for first name
  if (name == "") {
    alert("Please enter a value for your name");
    // Ensures form is not submitted
    console.log(name);
    return false;
  }
  //regular expression for email
  let regularExpressionEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  //for email
  if (!regularExpressionEmail.test(email)) {
    alert("You email is invalid");
    console.log(email);
    return false;
  }

  if (collectionTime == "") {
    alert("you have not entered a delivery time");
    console.log(collectionTime);
    return false;
  }
  // // For message box
  // if (message == "") {
  //   console.log("failed");
  //   confirm("you have not entered a message do you wish to continue?");
  //   if (!confirm) {
  //     return false;
  //   }
  // }
  else {
    //if the all pass return true
    return true;
  }
}
export { validateForm };
