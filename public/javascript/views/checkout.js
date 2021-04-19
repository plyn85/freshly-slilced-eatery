//imports
import * as cartData from "../dataAccess/cartData.js";
// import * as navCart from "../views/navCart.js";

//
//Use the array map method to iterate through meals
let displayCartItems = (cartItems) => {
  //if the cartItems are not null
  //
  if (cartItems != null) {
    const rows = cartItems.map((cartItem) => {
      let card = `<div class="row">
        <div class="product-name col-4">
            <strong>${cartItem.meal_name}</strong>
        </div>
        <div class="col-4">
            <strong>
                quantity:${cartItem.quantity}
            </strong>
        </div>
        <div class="col-4">
            <strong>
                total price:${cartItem.total}
            </strong>
        </div>
    </div>`;
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

//call the load cartItems function
loadCartItems();
