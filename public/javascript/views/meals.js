// Function used to update index.html
//

import * as mealsData from "../dataAccess/mealsData.js";
// import { Product } from "../models/products.js";

let displayMeals = (meals) => {
  const rows = meals.map((meal) => {
    let row = `${meal._id}
                    ${meal.meal_name}
                    ${meal.meal_description}
                    ${Number(meal.meal_price).toFixed(2)}`;

    return console.log(row);
  });

  // document.getElementById("mealsDiv").innerHTML = rows.join("");
};

// Get all meals and then display
let loadMeals = async () => {
  // get products data - note only one parameter in function call
  const meals = await mealsData.getMeals();
  //pass json data for display
  if (meals) {
    displayMeals(meals);
  }
};

//loading the meals
loadMeals();
