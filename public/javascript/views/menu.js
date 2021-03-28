// Function used to update menu.html
//

import * as mealsData from "../dataAccess/mealsData.js";
// import { Product } from "../models/products.js";

//Use the array map method to iterate through meals
let displayMeals = (meals) => {
  const rows = meals.map((meal) => {
    //each meal added to a card
    let card = ` <div class="card-columns">
    <div class="card card-body">
    <p> ${meal._id}</p>
        <span class="float-right font-weight-bold">${Number(
          meal.meal_price
        ).toFixed(2)}</span>
        <h6 class="text-truncate">  ${meal.meal_name}</h6>
        <p class="small">  ${meal.meal_description}
        </p>
        <a href="menu.html" class="btn-sm btn-info p-2 col-5 col-md-4 col-lg-1">Add Meal</a>
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

//loading the meals
loadMeals();
