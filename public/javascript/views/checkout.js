//imports
import * as cartData from "../dataAccess/cartData.js";
import { getObjectFromLocalStorage } from "../helper_functions/helpers.js";
import { addObjectToLocalStorage } from "../helper_functions/helpers.js";

//passed in to numberFormat to change  to currency
let options = { style: "currency", currency: "EUR" };
//consts and variables

let changeOrder = document.getElementById("changeOrder");
//
//Use the array map method to iterate through meals
let displayCartItems = (cartItems) => {
  //if the cartItems are not null
  //
  if (cartItems != null) {
    const rows = cartItems.map((cartItem) => {
      let card = `
        <small class="product-name col-12 col-md-4">
           ${cartItem.meal_name}
        </small>
        <small class="col-12 col-md-4">
                quantity: ${cartItem.quantity}
        </small>
        <small class="col-12 col-md-4">
                total price:${new Intl.NumberFormat("en-US", options).format(
                  cartItem.total
                )}
        </small>
    `;
      return card;
    });

    //add to cart page
    document.getElementById("cartItems").innerHTML = rows.join("");
  }
};

// Get all meals and then display
let loadCartItems = async () => {
  // get meals data - note only one parameter in function call
  const cartItems = await cartData.getCartItems();
  // console.log(cartItems);
  //if the cartItems are not returned empty
  if (cartItems != null) {
    //display the items
    displayCartItems(cartItems);
  }
};
//loads the cart
let loadCart = async () => {
  //constants and variables
  let cartSubTotal = 0;
  // get meals data - note only one parameter in function call
  const cart = await cartData.getCart();
  //if the cart those not return empty
  if (cart != null) {
    //set the subTotal to the cartSubTotal
    cartSubTotal = cart.subtotal;
    displayCart(cartSubTotal);
  }
  //if cart returns empty reload the cart so the total price changed
  else {
    //pass in the subTotal as zero
    displayCart(cartSubTotal);
  }
};
//function to the display the cart
let displayCart = (subTotal) => {
  //add the html to be displayed with the subTotal
  let cartSubTotal = `
        Total cost:
        ${new Intl.NumberFormat("en-US", options).format(subTotal)}
      `;
  //get the id of bottom section of the cartCard
  let checkout = document.getElementById("checkout");
  //add to cart page
  return (checkout.innerHTML = cartSubTotal);
};

//function will display the users delivery or collection info
let displayUsersDelOrColInfo = () => {
  //get the info from local storage
  let customerOrderObj = getObjectFromLocalStorage("customerOrder");
  //get the id of the div from checkout page
  let delOrColInfoDiv = document.getElementById("deliveryOrCollectionInfo");
  //add the user info to checkout page
  delOrColInfoDiv.innerHTML = `<h5>Name: ${customerOrderObj.name}</h5><br> 
                               <h5>Email: ${customerOrderObj.email}</h5><br>
                              `;
  //check if user has chosen collection or delivery
  if (customerOrderObj.delivery) {
    delOrColInfoDiv.innerHTML += `<h5>Delivery address: ${customerOrderObj.address}</h5><br>
                                  <h5>Delivery time: ${customerOrderObj.collectionOrDeliveryTime}</h5>`;
  } else {
    delOrColInfoDiv.innerHTML += `<h5>Collection time: ${customerOrderObj.collectionOrDeliveryTime}</h5>`;
  }
  //check if the user has added a message
  if (customerOrderObj.message !== "") {
    delOrColInfoDiv.innerHTML += `<h5>Message : ${customerOrderObj.message}</h5>`;
  }
};
//function to add that customer has chosen to change order to localStorage
let changeOrderChosen = () => {
  addObjectToLocalStorage("changeOrder", true);
};

//call the load cartItems and load cart function
loadCartItems();
loadCart();
displayUsersDelOrColInfo();
//add eventListener
changeOrder.addEventListener("click", changeOrderChosen);
