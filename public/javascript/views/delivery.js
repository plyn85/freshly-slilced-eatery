let getAddressInfo = async () => {
  //get the user address info
  let addressInfo = document.getElementById("address").value;
  //add the address info to an object to copy the address that will be
  // adding from collection form submission
  let customer = {
    address: addressInfo,
  };

  //then add the address info to local storage
  window.localStorage.setItem("customer", JSON.stringify(customer));

  //alert the user that there address has been added
  if (typeof localStorage.getItem("addressInfo") === "string") {
    alert("Your delivery information has been added");
    //send the user to the menu page
    window.location.replace("menu.html");
  } else {
    //reset the form
    delForm.reset();
  }
};

//add the event listener
document
  .getElementById("submitBtnDel")
  .addEventListener("click", getAddressInfo);
