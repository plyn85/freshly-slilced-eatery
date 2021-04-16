//displays the navigation bar on the cart page
//gets the cartItems length form local storage to display across all pages

let displayNavCart = () => {
  let cartLength = sessionStorage.getItem("cartItemsLen");
  // the html for the shopping cart with the length of the cart items added
  let navItem = `<a href="cart.html">
  <i class="fa fa-shopping-cart fa-lg" aria-hidden="true"></i>
   </a><small>${cartLength}</small>`;
  //return the nav item
  return (document.getElementById("shoppingCart").innerHTML = navItem);
};

//calls the function
displayNavCart();

export { displayNavCart };
