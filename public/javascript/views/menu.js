// Function used to update menu.html
//

import * as mealsData from "../dataAccess/mealsData.js";
// import { Product } from "../models/products.js";

//Use the array map method to iterate through meals
let displayMeals = (meals) => {
  const rows = meals.map((meal) => {
    //each meal added to a card
    let card = `
    <div class="card card-body">
    <p> ${meal._id}</p>
        <span class="float-right font-weight-bold">${Number(
          meal.meal_price
        ).toFixed(2)}</span>
    
        <h6 class="text-truncate">  ${meal.meal_name}</h6>
        <p class="small">  ${meal.meal_description}
        </p>
       <button id="${
         meal._id
       }"class="btn-sm btn-info p-2 col-5 col-md-4 col-lg-1 addMealsBtn">Add Meal</button>  
    </div>`;

    return card;
  });
  document.getElementById("mealsCard").innerHTML = rows.join("");
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

//
// find parent of button elements
const mealsCardBody = document.getElementById("mealsCard");
//
// add event listener
mealsCardBody.addEventListener("click", handleEvents);

// add mealToCartFunction
function handleEvents(event) {
  //if the button is clicked
  if (event.target && event.target.nodeName == "BUTTON") {
    //pass the meal id form the button id element
    addMealToCart(event.target.id);
  }
}

//add meals to cart function
async function addMealToCart(mealId) {
  //get the quantity form the hidden input
  let quantity = document.getElementById("quantity").value;
  //add meal data to object
  let mealData = {
    _id: mealId,
    quantity: quantity,
  };
  //pass the meals data to addMeals to cart
  const addMealToCart = await mealsData.addMealToCart(mealData);
  //if its successful return true
  if (addMealToCart) {
    return addMealToCart;
  }
}

//loading the meals
loadMeals();
