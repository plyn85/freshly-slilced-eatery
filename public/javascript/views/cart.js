// Function used to update menu.html
//
//import * as mealsData from "../dataAccess/mealData.js";
import * as cartData from "../dataAccess/cartData.js";
// import { Product } from "../models/products.js";

//Use the array map method to iterate through meals
let displayCartItems = (cartItems) => {
  const rows = cartItems.map((cartItem) => {
    let card = `
     <div class="row">
         <div class="col-12 col-sm-12 col-md-2 text-center">
             <img
                 class="img-responsive"
                 src="http://placehold.it/120x80"
                 alt="preview"
                 width="120"
                 height="80"
             >
         </div>
         <div class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
             <h4 class="product-name">
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
                     <input type="button" value="+" class="plus">
                     <input
                         type="number"
                         step="1"
                         max="99"
                         min="1"
                         value="${cartItem.quantity}"
                         title="Qty"
                         class="qty"
                         size="4"
                     >
                     <input type="button" value="-" class="minus">
                 </div>
                 </div>
             <div class="col-2 col-sm-2 col-md-2 text-right">
                 <button id=${cartItem._id} type="button" class="btn btn-outline-danger btn-xs">
                     <i class="fa fa-trash" aria-hidden="true"></i>
                 </button>
             </div>
         </div>
     </div>
     <hr>
    
     `;
    //return the card
    return card;
  });
  //add to cart page
  document.getElementById("cartCard").innerHTML = rows.join("");
};

// Get all meals and then display
let loadCartItems = async () => {
  // get meals data - note only one parameter in function call
  const cartItems = await cartData.getCartItems();
  console.log(cartItems);
  //pass json data for display
  if (cartItems) {
    displayCartItems(cartItems);
  }
};
// find parent of button elements
const cartCardBody = document.getElementById("cartCard");
//
// add event listener
cartCardBody.addEventListener("click", handleEvents);

// add mealToCartFunction
function handleEvents(event) {
  //if the button is clicked
  if (event.target && event.target.nodeName == "BUTTON") {
    //pass the event form the button id element
    deleteMealFromCart(event.target.id);
  }
}

//add meals to cart function
async function deleteMealFromCart(mealId) {
  //pass the meal id to deleteCartItems
  const deleteMeal = await cartData.deleteCartItem(mealId);
  //if its successful return true
  if (deleteMeal) {
    //reload the page when item are deleted
    location.reload();
    return deleteMeal;
  }
}
//Use the array map method to iterate through cart
let displayCart = (cart) => {
  const rows = cart.map((cart) => {
    let card = `
    <div>
    Total price:
    <b>${cart.subtotal}€</b>
</div>
       `;
    //return the card
    return card;
  });
  //add to cart page
  document.getElementById("cartCardLower").innerHTML = rows.join("");
};

// Get all meals and then display
let loadCart = async () => {
  // get meals data - note only one parameter in function call
  const cart = await cartData.getCart();
  console.log(cart);
  //pass json data for display
  if (cart) {
    displayCart(cart);
  }
};

//loading the cartItems and the cart
loadCartItems();
loadCart();
