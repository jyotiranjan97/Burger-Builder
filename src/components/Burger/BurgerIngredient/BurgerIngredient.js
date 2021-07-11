import React from "react";
import BreadBottom from "./BreadBottom";
import BreadTop from "./BreadTop";
import Chicken from "./Chicken";
import Paneer from "./Paneer";
import Salad from "./Salad";
import Cheese from "./Cheese";

function BurgerIngredient({ type }) {
  let ingredient = null;

  switch (type) {
    case "bread-bottom":
      ingredient = <BreadBottom />;
      break;
    case "bread-top":
      ingredient = <BreadTop />;
      break;
    case "chicken":
      ingredient = <Chicken />;
      break;
    case "paneer":
      ingredient = <Paneer />;
      break;
    case "salad":
      ingredient = <Salad />;
      break;
    case "cheese":
      ingredient = <Cheese />;
      break;
    default:
      ingredient = null;
  }

  return <>{ingredient}</>;
}

export default BurgerIngredient;
