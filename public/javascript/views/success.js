// add the customer and payment info to success html page

let getCusInfo = () => {
  //passed in to format amount charged as currency
  let options = { style: "currency", currency: "EUR" };
  //get the customer and payment info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  let chargeObj = JSON.parse(window.localStorage.getItem("chargeInfo"));
  //add the information to customerInfo variable
  let customerInfo = `
          <div class="col-10 col-md-8 col-xl-4 mont-font">
          <h5>Order id: ${obj._id}</h5><hr class="green hr-order">
          <h5>Name: ${obj.name}</h5><hr class="green hr-order">
          <h5>Email: ${obj.email}</h5>`;
  //check if the delivery option has been chosen
  if (obj.delivery == "yes") {
    customerInfo += `<h5 class="text-center">Delivery To: ${obj.address}</h5>`;
  }

  customerInfo += `<hr class="green hr-order">
          <h5>Ordered on: ${obj.time_created.substring(0, 10)}</h5>
          <h5>
          <hr class="green hr-order">`;
  //check if the collection option has been chosen
  if (obj.collection == "yes") {
    customerInfo += `Collection`;
  }
  //if it has not
  else {
    customerInfo += `Delivery`;
  }
  customerInfo += ` time: ${
    obj.collection_delivery_time
  }</h5><hr class="green hr-order"> <h5>invoice number: ${
    chargeObj.invoice_num
  }</h5><hr class="green hr-order">
          <h5>Amount charged: ${new Intl.NumberFormat("en-US", options).format(
            chargeObj.amount_charged / 100
          )} </h5><hr class="green hr-order">
          </div>
         `;
  // add the customer and payment info to the div element
  document.getElementById("successInfo").innerHTML = customerInfo;
};

//call the function
getCusInfo();
