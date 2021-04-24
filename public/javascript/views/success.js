// add the customer info to success html page

let getCusInfo = () => {
  //get the customer info from the local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  let info;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      info = `
        
      
          <h2>Order id:${obj._id}<h2>
          <h3>Name:${obj.name}<h3>
          <h4>Email:${obj.email}<h4> 
          <h4>Order at:${obj.time_created}<h4>
          <h4>Collection time:${obj.collection_time}<h4>`;
    }
  }
  document.getElementById("successInfo").innerHTML = info;
};

//call the function
getCusInfo();
