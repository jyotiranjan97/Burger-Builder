import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const CONTROLS = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Paneer", type: "paneer" },
  { label: "Chicken", type: "chicken" },
];

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {CONTROLS.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          disabled={props.disabled[control.type]}
          added={() => props.addIngredient(control.type)}
          removed={() => props.removeIngredient(control.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        Order Now
      </button>
    </div>
  );
}

export default BuildControls;
