import React, { useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const PRICES = {
  salad: 5,
  cheese: 10,
  paneer: 15,
  chicken: 20,
};

function BurgerBuilder() {
  const [burgerIngredients, setBurgerIngredients] = useState({
    salad: 1,
    cheese: 0,
    paneer: 0,
    chicken: 0,
  });
  const [totalPrice, setTotalPrice] = useState(20);
  const [purchasable, setPurchasable] = useState(true);

  const onAddIngredient = (type) => {
    const oldCount = burgerIngredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...burgerIngredients };
    updatedIngredients[type] = updatedCount;
    let priceAmount = totalPrice;
    priceAmount += PRICES[type];
    setBurgerIngredients(updatedIngredients);
    setTotalPrice(priceAmount);
    setPurchasable(updatePurchaseState(updatedIngredients));
  };

  const onRemoveIngredient = (type) => {
    const oldCount = burgerIngredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...burgerIngredients };
    let priceAmount = totalPrice;
    priceAmount -= PRICES[type];
    updatedIngredients[type] = updatedCount;
    setBurgerIngredients(updatedIngredients);
    setTotalPrice(priceAmount);
    setPurchasable(updatePurchaseState(updatedIngredients));
  };

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const burger = (
    <Aux>
      <Burger burgerIngredients={burgerIngredients} />
      <BuildControls
        addIngredient={onAddIngredient}
        removeIngredient={onRemoveIngredient}
        purchasable={purchasable}
        price={totalPrice}
      />
    </Aux>
  );

  return <Aux>{burger}</Aux>;
}

export default BurgerBuilder;
