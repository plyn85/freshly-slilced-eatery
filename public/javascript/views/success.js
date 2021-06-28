// add the customer and payment info to success html page

let getCusInfo = () => {
  //get the customer info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  let customerInfo = `
          <h2 class="text-center">Order id: ${
            obj._id
          }</h2><hr class="green hr-order">
          <h3 class="text-center">Name: ${
            obj.name
          }</h3><hr class="green hr-order">
          <h4 class="text-center">Email: ${obj.email}</h4>
          <h4 class="text-center">Delivery Address: ${obj.address}</h4>
          <hr class="green hr-order">
          <h4 class="text-center">Ordered on: ${obj.time_created.substring(
            0,
            10
          )}</h4>
          <h4 class="text-center">
          Collection time: ${
            obj.collection_delivery_time
          }</h4><hr class="green hr-order">
          
          `;
  // add the customer info to the div element
  document.getElementById("successInfo").innerHTML = customerInfo;
};

//call the function
getCusInfo();
//passed in to format amount charged as currency
let options = { style: "currency", currency: "EUR" };
//function to handle payment info
let getPaymentInfo = () => {
  //get the payment info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("chargeInfo"));
  let paymentInfo = `
          <h4 class="text-center">invoice number: ${
            obj.invoice_num
          }</h4><hr class="green hr-order">
          <h4 class="text-center">Amount charged: ${new Intl.NumberFormat(
            "en-US",
            options
          ).format(obj.amount_charged / 100)} </h4><hr class="green hr-order">
         `;

  document.getElementById("paymentInfo").innerHTML = paymentInfo;
};
//call the function
getPaymentInfo();
