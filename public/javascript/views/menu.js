// Function used to update menu.html
//
import * as navCart from "../views/navCart.js";
import * as mealsData from "../dataAccess/menuData.js";
import { addMealToLocalStorage } from "../helper_functions/helpers.js";
import { showToast } from "../toasts/toast-views/toasts.js";

//
//Use the array map method to iterate through meals
let displayMeals = (meals) => {
  //passed in to numberFormat to change meal price to currency
  let options = { style: "currency", currency: "EUR" };
  const col = meals.map((meal) => {
    //each meal added to a card
    let card = `
    <div class="col-12 col-md-6 meal-${meal._id} col-6 meals-col">
        <span class="float-right font-weight-bold bebas">${new Intl.NumberFormat(
          "en-US",
          options
        ).format(meal.meal_price)}</span>
    
        <h6 class="text-truncate mont-font fw-bold"> ${meal.meal_name}</h6>
        <p class="mont-font fw-bold">  ${meal.meal_description}
        </p>
       <a id="${
         meal._id
       }"class="btn col-3 btn-outline-success p-2 addMealsBtn mt-5">Add Meal</a>  
    </div>`;

    return card;
  });
  document.getElementById("mealsCard").innerHTML = col.join("");

  // find the add meals btn classes
  const mealsBtn = document.getElementsByClassName("addMealsBtn");
  //loop through the classes
  for (let i = 0; i < mealsBtn.length; i++) {
    //add even listener
    mealsBtn[i].addEventListener("click", addMealToCart);
  }
};

// Get all meals and then display
let loadMeals = async () => {
  // get meals data - note only one parameter in function call
  const meals = await mealsData.getMeals();
  //pass json data for display
  if (meals) {
    displayMeals(meals);
  }
};

//add meals to cart function
async function addMealToCart() {
  //get the quantity form the hidden input
  let quantity = document.getElementById("quantity").value;
  //add meal data to object
  let mealData = {
    _id: this.id,
    quantity: quantity,
    user_id: 0,
  };
  //pass the meals data to addMeals to cart
  const userId = await mealsData.addMealToCart(mealData);
  //if the return value is true the item is not already in the cart
  if (userId) {
    //add meal to local storage
    addMealToLocalStorage("mealData", mealData);
    // reload the navCart
    navCart.displayNavCartTotal();
    //call the toast
    showToast("showMealAdded");
  } else {
    //call the toast
    showToast("mealInCart");
  }
}

//loading the meals
loadMeals();
