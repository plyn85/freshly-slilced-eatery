//imports
import { getCartItems } from "../dataAccess/cartData.js";

//displays the navigation bar on the cart page across all pages

let displayNavCart = async (cartItemsLength) => {
  //if the length is undefined make it zero
  if (cartItemsLength == undefined) {
    cartItemsLength = 0;
  }
  let navItem = `<a href="cart.html" id='hidden' class="green">
  <i class="fa fa-shopping-cart fa-lg green" aria-hidden="true"></i>
   </a><small>${cartItemsLength}</small>`;
  //return the nav item
  return (document.getElementById("shoppingCart").innerHTML = navItem);
};
//loads the nav cart
let loadNavCart = async (quantityUpdated) => {
  //constants and variables
  let cartItemsLength = 0;

  // get cartItems data
  const cartItems = await getCartItems();

  //if there are items in the cart
  if (cartItems != null) {
    //cartItems length to the current cartItems length
    cartItemsLength = cartItems.length;
    //if the quantity has beed updated and there is only one item
    if (quantityUpdated) {
      cartItems.forEach((item) => {
        cartItemsLength += item.quantity;
      });
    }
  }
  //add the total quantity
  //if there are not pass in zero as the length
  displayNavCart(cartItemsLength);
};

//call the function
loadNavCart();
export { displayNavCart, loadNavCart };
