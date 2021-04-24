//imports
import { stripePayment } from "../dataAccess/cartData.js";

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
  //create the stripe token
  stripe.createToken(card).then(function (result) {
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

//send and  the stipe data
let stripeTokenHandler = async (token) => {
  console.log(token);
  //pass the token to the stripe payment function in cartData
  const result = await stripePayment(token);
  console.log(result);
  //if the result returns true
  if (result == true) {
    alert("your payment was a success");
    //and send the customer to the success page
    window.location.replace("success.html");
  } else {
    alert("your Payment was not successful please enter your details again");
    form.reset();
  }
};
