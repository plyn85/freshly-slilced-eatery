//imports
import { getCartItems } from "../dataAccess/cartData.js";

//displays the navigation bar on the cart page across all pages

let displayNavCart = async (cartItemsLength) => {
  let navItem = `<a href="cart.html">
  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
   </a><small>${cartItemsLength}</small>`;
  //return the nav item
  return (document.getElementById("shoppingCart").innerHTML = navItem);
};
//loads the nav cart
let loadNavCart = async () => {
  //constants and variables
  let cartItemsLength = 0;
  // get cartItems data
  const cartItems = await getCartItems();

  //if there are items in the cart
  if (cartItems != null) {
    cartItemsLength = cartItems.length;
    displayNavCart(cartItemsLength);
  }
  //if there are not pass in zero as the length
  else {
    displayNavCart(cartItemsLength);
  }
};
//calls the function
loadNavCart();

export { displayNavCart, loadNavCart };
