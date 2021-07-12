import React from "react";
import classes from "./Order.module.css";

function Order(props) {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span className={classes.Ingredient} key={ig.name}>
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>INR {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
}

export default Order;
