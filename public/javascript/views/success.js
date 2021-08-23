//imports
import * as helperFunctions from "../helper_functions/helpers.js";
// add the customer and payment info to success html page

let getCusInfo = () => {
  //passed in to format amount charged as currency
  let options = { style: "currency", currency: "EUR" };
  //get the customer and payment info from the local storage
  let obj = helperFunctions.getObjectFromLocalStorage("customerOrder");
  console.log(obj);
  //add the information to customerInfo variable
  let customerOrderInfo = `
          <div class="col-10 col-md-8 col-xl-4 mont-font">
          <h5>Order id: ${obj._id}</h5><hr class="green hr-order">
          <h5>Name: ${obj.name}</h5><hr class="green hr-order">
          <h5>Email: ${obj.email}</h5><hr class="green hr-order">`;
  //check if the delivery option has been chosen
  if (obj.delivery == "yes") {
    customerOrderInfo += `<h5>Delivery To: ${obj.address}</h5>`;
  }

  customerOrderInfo += `<hr class="green hr-order">
          <h5>Ordered on: ${obj.time_created.substring(0, 10)}</h5>
          <h5>
          <hr class="green hr-order">`;
  //check if the collection option has been chosen
  if (obj.collection == "yes") {
    customerOrderInfo += `Collection`;
  }
  //if it has not
  else {
    customerOrderInfo += `Delivery`;
  }
  customerOrderInfo += ` time: ${
    obj.collection_delivery_time
  }</h5><hr class="green hr-order"> <h5>invoice number: ${
    obj.invoice_number
  }</h5><hr class="green hr-order">
          <h5>Amount charged: ${new Intl.NumberFormat("en-US", options).format(
            obj.amount
          )} </h5><hr class="green hr-order">
          </div>
         `;
  // add the customer and payment info to the div element
  document.getElementById("successInfo").innerHTML = customerOrderInfo;
};

//call the function
getCusInfo();
