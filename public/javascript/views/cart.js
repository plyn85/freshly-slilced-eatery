//imports
import * as cartData from "../dataAccess/cartData.js";
import * as navCart from "../views/navCart.js";
import * as helperFunctions from "../helper_functions/helpers.js";
//passed in to numberFormat to change  to currency
let options = { style: "currency", currency: "EUR" };
//
//Use the array map method to iterate through meals
let displayCartItems = (cartItems) => {
  //if the cartItems are not null
  //
  if (cartItems.length > 0) {
    const rows = cartItems.map((cartItem) => {
      let card = `
     <div class="row">
         <div class="col-12  col-md-6">
             <h4 class="product-name">
              <small id='mealId'>${cartItem.meal_id}</small>
                     <strong>${cartItem.meal_name}</strong>
             </h4>
             <h4>
                 <small>${cartItem.meal_description}</small>
             </h4>
         </div>
         <div class="col-12 col-md-6 row">
             <div class="col-12 col-md-6 text-md-right">
                 <h6>
                     <strong>
                    Meal Price:${new Intl.NumberFormat("en-US", options).format(
                      cartItem.price
                    )}
                     </strong>
                 </h6>
             </div>
             <div class="col-12 col-md-6 text-md-right">
                 <h6>
                     <strong>
                        Total price:${new Intl.NumberFormat(
                          "en-US",
                          options
                        ).format(cartItem.total)}
                     </strong>
                 </h6>
             </div>
             
             <div class="col-4">
                 <div class="quantity">
                     <input type="button" value="+" class="plus qtyInc" id="${
                       cartItem.meal_id
                     }">
                     <input
                         type="number"
                         step="1"
                         max="99"
                         max-length="3"
                         min="1"
                         value="${cartItem.quantity}"
                         title="Qty"
                         class="qty"
                         size="4"
                         id="${cartItem.meal_id}"
                         class="qty">
                     <input type="button" value="-" class="minus qtyDec" id="${
                       cartItem.meal_id
                     }">
                 </div>
                 </div>
             <div class="col-2 text-right">
                 <button id="${
                   cartItem._id
                 }" type="button" class="btn btn-outline-danger btn-xs deleteCartItem">
                     <i class="fa fa-trash" aria-hidden="true"></i>
                 </button>
             </div>
         </div>
     </div>
     <hr>`;
      //return the card
      return card;
    });

    //add to cart page
    document.getElementById("cartCard").innerHTML = rows.join("");
    //Find button all elements with matching class name
    let increaseQuantity = document.getElementsByClassName("qtyInc");
    let decreaseQuantity = document.getElementsByClassName("qtyDec");
    let deleteCartItem = document.getElementsByClassName("deleteCartItem");
    let qtyInput = document.getElementsByClassName("qty");
    //add event listeners

    for (let i = 0; i < deleteCartItem.length; i++) {
      increaseQuantity[i].addEventListener("click", changeQuantityCartItem);
      decreaseQuantity[i].addEventListener("click", changeQuantityCartItem);
      deleteCartItem[i].addEventListener("click", deleteItem);
      qtyInput[i].addEventListener("change", changeQuantityCartItemFromInput);
    }
  }
  //if the cartItems are returned as null
  else {
    document.getElementById(
      "cartCard"
    ).innerHTML = `<h1>Your Cart is currently empty!<h1>`;
  }
};
//
//add the changes form the cart quantity
let changeQuantity = async (quantity, mealId) => {
  //pass the meal data to an objects
  let mealData = {
    _id: mealId,
    quantity: quantity,
  };
  // add the new quantities
  let changedQuantity = await cartData.changeQuantity(mealData);
  //if it return true
  if (changedQuantity) {
  }
  //reload the cart the cart Items and the navCart when the quantity is changed
  loadCartItems();
  loadCart();
  //will return true if successful
  return changedQuantity;
};
//
//function to handle if the users changes the input box with out the buttons
async function changeQuantityCartItemFromInput() {
  //call the change quantity function passing in the id and changed value
  changeQuantity(this.value, this.id);
}
//
//function changes the quantity of the shopping cart
async function changeQuantityCartItem() {
  //constants or variables
  let quantityInput = document.getElementsByClassName("qty");

  //loop trough the inputs
  for (let i = 0; i < quantityInput.length; i++) {
    //if the id of the increment or decrement matches the id
    // of the quantity box
    if (this.id === quantityInput[i].id) {
      //if the plus is clicked
      if (this.value == "+") {
        //increase the quantity
        quantityInput[i].value++;
        //call the change quantity function passing in the changed value
        //and meal id
        let quantityIncreased = await changeQuantity(
          quantityInput[i].value,
          this.id
        );
        //if returns true
        if (quantityIncreased === true) {
          //increase the navCart total
          helperFunctions.increaseNavCartTotal();
        }
      }
      //if the minus is clicked
      else if (this.value == "-") {
        //decrease the quantity
        quantityInput[i].value--;
        //call the change quantity function passing in the changed value
        //and meal id
        let quantityDecreased = await changeQuantity(
          quantityInput[i].value,
          this.id
        );
        //if returns true
        if (quantityDecreased === true) {
          //decrease the navCart
          helperFunctions.decreaseNavCartTotal();
        }
      }
    }
  }
}
//
//Function gets all meals and then display
let loadCartItems = async () => {
  // get meals data - note only one parameter in function call
  const cartItems = await cartData.getCartItems();
  if (cartItems == 0) {
    helperFunctions.addObjectToLocalStorage("userId", 0);
  }
  //display the items
  displayCartItems(cartItems);
};
//
//function loads the cart
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
//
//Function to display the cart
let displayCart = (subTotal) => {
  //add the html to be displayed with the subTotal
  let cartSubTotal = `
        SubTotal:
         ${new Intl.NumberFormat("en-US", options).format(subTotal)}
      `;
  //check if the subtotal is equal to NaN
  if (cartSubTotal == NaN) {
    cartSubTotal = 0;
  }
  //get the id of bottom section of the cartCard
  let cartCardLower = document.getElementById("cartCardLower");
  //add to cart page
  return (cartCardLower.innerHTML = cartSubTotal);
};

//add meals to cart function
async function deleteItem() {
  //pass the meal id to deleteCartItems
  let result = await cartData.deleteCartItem(this.id);

  //if the result is true or zero an item has been deleted
  if (result) {
    //reload everything on the page
    loadCartItems();
    loadCart();
    navCart.loadNavCart();
  }
}
//function which will decide which page to send the user after
// check out button is clicked
let sendUserAfterCheckOutBtnClicked = () => {
  //get objects from local storage
  let changeOrder = helperFunctions.getObjectFromLocalStorage("changeOrder");

  if (changeOrder) {
    window.location.replace("checkout.html");
  }
  //if the order exists and the customer has not chosen to change it
  else {
    window.location.replace("orderForm.html");
  }
};
//add the eventListener for the checkout button
document
  .getElementById("checkoutBtn")
  .addEventListener("click", sendUserAfterCheckOutBtnClicked);

//
//call the functions
loadCartItems();
loadCart();

export { loadCartItems };
