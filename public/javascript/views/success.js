// add the customer and payment info to success html page
//customer info
let getCusInfo = () => {
  //get the customer info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  let customerInfo;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      customerInfo = `
        
      
          <h2>Order id: ${obj._id}<h2>
          <h3>Name: ${obj.name}<h3>
          <h4>Email: ${obj.email}<h4> 
          <h4>Order at: ${obj.time_created}<h4>
          <h4>Collection time: ${obj.collection_time}<h4>`;
    }
  }
  document.getElementById("successInfo").innerHTML = customerInfo;
};

//call the function
getCusInfo();
//passed in to format amount charged as currency
let options = { style: "currency", currency: "EUR" };
//payment info
let getPaymentInfo = () => {
  //get the payment info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("chargeInfo"));
  let PaymentInfo;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      PaymentInfo = `
          <h4>invoice_num: ${obj.invoice_num}<h4>
          <h3>Amount charged: ${new Intl.NumberFormat("en-US", options).format(
            obj.amount_charged / 100
          )} <h3>
         
         `;
    }
  }
  document.getElementById("paymentInfo").innerHTML = PaymentInfo;
};
//call the function
getPaymentInfo();
