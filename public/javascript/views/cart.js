//imports
import * as cartData from "../dataAccess/cartData.js";
import * as navCart from "../views/navCart.js";

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

  //reload the cart the cart Items and the navCart when the quantity is changed
  loadCartItems();
  loadCart();
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
  if (cartItems == 0) {
    localStorage.setItem("userId", JSON.parse(0));
  }
  //display the items
  displayCartItems(cartItems);
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
  let cartSubTotal = `
        SubTotal:
         ${new Intl.NumberFormat("en-US", options).format(subTotal)}
      `;
  //get the id of bottom section of the cartCard
  let cartCardLower = document.getElementById("cartCardLower");
  //add to cart page
  return (cartCardLower.innerHTML = cartSubTotal);
};

//add meals to cart function
async function deleteItem() {
  //pass the meal id to deleteCartItems
  const result = await cartData.deleteCartItem(this.id);

  //if the result is true or zero an item has beed deleted
  if (result == 0 || result)
    //reload every thing on the page
    loadCartItems();
  loadCart();
  navCart.loadNavCart();
}

//function to check if the user info is already in local storage
let checkUserInLocalStorage = () => {
  //variables
  let collectionOrDelivery = "";
  let address = "";
  let fillUserForm = false;
  //check if the user information is in local storage
  let obj = JSON.parse(window.localStorage.getItem("customer"));
  //if the customer object exists
  if (obj != null) {
    //and if it is not empty
    if (Object.entries(obj).length != 0) {
      //check if collection chosen
      if (obj.collection == "yes") {
        collectionOrDelivery = `Collection`;
      }
      //check if delivery has been chosen
      else {
        collectionOrDelivery = "Delivery";
        //add the customer address if it has
        address = `delivery address: ${obj.address}`;
      }
      //do not show the alert box if it only contains the customers address
      if (Object.entries(obj).length != 1) {
        if (
          confirm(
            `You have previously entered order details
          name: ${obj.name} 
          email: ${obj.email}
          ${collectionOrDelivery} time: ${obj.collection_delivery_time}
          ${address}
          
          do you wish to use some or all of these details for
          your current order?`
          )
        ) {
          //set fill user form to true and add to local storage
          fillUserForm = true;
          JSON.stringify(
            window.localStorage.setItem("fillUserForm", fillUserForm)
          );
        } else {
          //and fill user form should be false
          fillUserForm = false;
          JSON.stringify(
            window.localStorage.setItem("fillUserForm", fillUserForm)
          );
        }
      }
    }
  }
  //send the user to confirmCollection form
  window.location.replace("confirmCollection.html");
};
//adding eventListener
document
  .getElementById("checkoutBtn")
  .addEventListener("click", checkUserInLocalStorage);

//calls the functions
loadCartItems();
loadCart();

export { loadCartItems };
