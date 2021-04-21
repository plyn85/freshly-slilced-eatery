//imports
import { stripePayment } from "../dataAccess/cartData.js";
import { validateForm } from "../validation/formValidation.js";
// Create a Stripe client.
let stripe = Stripe("pk_test_OtuMpmziQFrVOnItNeA1NK8n00Pdyae7Qg");

// Create an instance of Elements.
let elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
let style = {
  base: {
    color: "#32325d",
    lineHeight: "18px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

// Create an instance of the card Element.

let card = elements.create("card", { style: style, hidePostalCode: true });

// Add an instance of the card Element into the `card-element` <div>.
card.mount("#card-element");

// Handle real-time validation errors from the card Element.
card.addEventListener("change", function (event) {
  var displayError = document.getElementById("card-errors");
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "";
  }
});

// Handle form submission.
let form = document.getElementById("payment-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  //get the email and name of user
  let name = document.getElementById("cardName").value;
  let email = document.getElementById("email").value;
  //validate before sending with stripe token
  // validate the message and delivery time
  let validatedInputs = validateForm(name, email);
  //if the are validated
  if (validatedInputs) {
  }
  //create the stripe token
  stripe
    .createToken(card, { name: name, email: email })
    .then(function (result) {
      if (result.error) {
        // Inform the user if there was an error.
        let errorElement = document.getElementById("card-errors");
        errorElement.textContent = result.error.message;
      } else {
        //get the result of the token
        let token = result.token;
        stripeTokenHandler(token);
        form.reset();
      }
    });
});

//send and recieve the stipe data
let stripeTokenHandler = async (token) => {
  //pass the token to the stripe payment function in cartData
  const result = stripePayment(token);
  //if the result is true reload the form and send the user to success page
  if (result) {
    window.location.replace("success.html");
  }
};
