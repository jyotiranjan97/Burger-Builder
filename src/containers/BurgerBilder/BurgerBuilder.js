import React, { useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary/Auxiliary";

function BurgerBuilder() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    salad: 0,
    cheese: 0,
    paneer: 0,
    chicken: 0,
  });

  const onAddIngredient = (type) => {
    const oldCount = burgerIngredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...burgerIngredients };
    updatedIngredients[type] = updatedCount;
    setBurgerIngredients(updatedIngredients);
  };

  const onRemoveIngredient = (type) => {
    const oldCount = burgerIngredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...burgerIngredients };
    updatedIngredients[type] = updatedCount;
    setBurgerIngredients(updatedIngredients);
  };

  const burger = (
    <Aux>
      <Burger burgerIngredients={burgerIngredients} />
      <BuildControls
        addIngredient={onAddIngredient}
        removeIngredient={onRemoveIngredient}
      />
    </Aux>
  );

  return <Aux>{burger}</Aux>;
}

export default BurgerBuilder;
