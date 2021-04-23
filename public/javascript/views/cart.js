//imports
import * as cartData from "../dataAccess/cartData.js";
import * as navCart from "../views/navCart.js";

//
//Use the array map method to iterate through meals
let displayCartItems = (cartItems) => {
  //if the cartItems are not null
  //
  if (cartItems.length > 0) {
    const rows = cartItems.map((cartItem) => {
      let card = `
     <div class="row">
         <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
             <h4 class="product-name">
              <small id='mealId'>${cartItem.meal_id}</small>
                     <strong>${cartItem.meal_name}</strong>
             </h4>
             <h4>
                 <small>${cartItem.meal_description}</small>
             </h4>
         </div>
         <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
             <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                 <h6>
                     <strong>
                         ${cartItem.price}
                         <span class="text-muted">x</span>
                     </strong>
                 </h6>
             </div>
             <div class="col-3 col-sm-3 col-md-6 text-md-right" style="padding-top: 5px">
                 <h6>
                     <strong>
                        total price:  ${cartItem.total}
                         <span class="text-muted">x</span>
                     </strong>
                 </h6>
             </div>
             
             <div class="col-4 col-sm-4 col-md-4">
                 <div class="quantity">
                     <input type="button" value="+" class="plus qtyInc" id="${cartItem.meal_id}">
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
                     <input type="button" value="-" class="minus qtyDec" id="${cartItem.meal_id}">
                 </div>
                 </div>
             <div class="col-2 col-sm-2 col-md-2 text-right">
                 <button id="${cartItem._id}" type="button" class="btn btn-outline-danger btn-xs deleteCartItem">
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
    const increaseQuantity = document.getElementsByClassName("qtyInc");
    const decreaseQuantity = document.getElementsByClassName("qtyDec");
    const deleteCartItem = document.getElementsByClassName("deleteCartItem");
    const qtyInput = document.getElementsByClassName("qty");
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

//add the changes form the cart quantity
let changeQuantity = async (quantity, mealId) => {
  //pass the meal data to an objects
  let mealData = {
    _id: mealId,
    quantity: quantity,
  };
  // add the new quantities
  const changedQuantity = await cartData.changeQuantity(mealData);

  //pass json data for display
  if (changedQuantity) {
    //reload the cart the cart Items and the navCart when the quantity is changed
    loadCartItems();
    loadCart();
  }
};

//function to handle if the users changes the input box with out the buttons
//
async function changeQuantityCartItemFromInput() {
  //call the change quantity function passing in the id and changed value
  changeQuantity(this.value, this.id);
}

//function changes the quantity of the shopping cart
async function changeQuantityCartItem() {
  //constants or variables
  let quantityUpdated = false;
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
        changeQuantity(quantityInput[i].value, this.id);
        //call the navCart to update the total items passing the meal id
        // and quantity updated as true
        quantityUpdated = true;
        //navCart.loadNavCart(quantityUpdated);
      }
      //if the minus is clicked
      else if (this.value == "-") {
        //decrease the quantity
        quantityInput[i].value--;
        //call the change quantity function passing in the changed value
        //and meal id
        changeQuantity(quantityInput[i].value, this.id);
        //call the navCart to update the total items passing the meal id
        // and quantity updated as true
        quantityUpdated = true;
        // navCart.loadNavCart(quantityUpdated);
      }
    }
  }
}

// Get all meals and then display
let loadCartItems = async () => {
  // get meals data - note only one parameter in function call
  const cartItems = await cartData.getCartItems();
  //if the cartItems are not returned empty
  if (cartItems != null) {
    //display the items
    displayCartItems(cartItems);
  }
  //if there are no items left in the cart
  else {
    //the cartItems will be passed as null
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
//Use the array map method to iterate through cart
let displayCart = (subTotal) => {
  //add the html to be displayed with the subTotal
  let cartSubTotal = `<div>
        Total price:
        <b>${subTotal}€</b>
      </div>`;
  //get the id of bottom section of the cartCard
  let cartCardLower = document.getElementById("cartCardLower");
  //add to cart page
  return (cartCardLower.innerHTML = cartSubTotal);
};

//add meals to cart function
async function deleteItem() {
  console.log("delete cart item", this.id);
  //pass the meal id to deleteCartItems
  const result = await cartData.deleteCartItem(this.id);

  //if the result is true or zero an item has beed deleted
  if (result == 0 || result)
    //reload every thing on the page
    loadCartItems();
  loadCart();
  navCart.loadNavCart();
}

//loading the cartItems and the cart
//calls the function
// displayNavCart();
loadCartItems();
loadCart();

export { loadCartItems };
