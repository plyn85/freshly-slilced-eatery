//imports
import { stripePayment } from "../dataAccess/stripePayment.js";
import { addCustomerOrderData } from "../dataAccess/collectionData.js";
import * as helperFunctions from "../helper_functions/helpers.js";
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

//send the stipe data
let stripeTokenHandler = async (token) => {
  //pass the token to the stripe payment function in cartData
  const result = await stripePayment(token);
  // console.log(result);
  //if the result returns true the payment was a success
  if (result == true) {
    //get the order information form localStorage
    let customerOrderInfoFromLocalStorage =
      helperFunctions.getObjectFromLocalStorage("customerOrder");

    //send it to the API
    let customerOrderAdded = addCustomerOrderData(
      customerOrderInfoFromLocalStorage
    );
    //if the order has been added send the customer to the success page
    if (customerOrderAdded) {
      alert("your order was a success");
      window.location.replace("success.html");
    }
  } else {
    alert("your Payment was not successful please enter your details again");
    form.reset();
  }
};
