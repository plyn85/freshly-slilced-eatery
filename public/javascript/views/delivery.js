let getAddressInfo = async () => {
  //get the user address info
  let addressInfo = document.getElementById("address").value;
  //add it to local storage
  JSON.stringify(addressInfo);
  window.localStorage.setItem("addressInfo", addressInfo);
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
