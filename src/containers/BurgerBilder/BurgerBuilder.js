import React, { useState } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";

const PRICES = {
  salad: 5,
  cheese: 10,
  paneer: 15,
  chicken: 20,
};

function BurgerBuilder(props) {
  const [burgerIngredients, setBurgerIngredients] = useState({
    salad: 1,
    cheese: 0,
    paneer: 0,
    chicken: 0,
  });
  const [totalPrice, setTotalPrice] = useState(20);
  const [purchasable, setPurchasable] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState({
    salad: false,
    cheese: true,
    paneer: true,
    chicken: true,
  });
  const [purchasing, setPurchasing] = useState(false);

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
    buttonDisableCheck(updatedIngredients);
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
    buttonDisableCheck(updatedIngredients);
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

  const buttonDisableCheck = (ingredients) => {
    const disabledInfo = {
      ...ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    setIsButtonDisabled(disabledInfo);
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.history.push({
      pathname: "/checkout",
      state: [burgerIngredients],
    });
  };

  const burger = (
    <Aux>
      <Burger burgerIngredients={burgerIngredients} />
      <BuildControls
        addIngredient={onAddIngredient}
        removeIngredient={onRemoveIngredient}
        disabled={isButtonDisabled}
        purchasable={purchasable}
        price={totalPrice}
        ordered={purchaseHandler}
      />
    </Aux>
  );

  const orderSummary = (
    <OrderSummary
      ingredients={burgerIngredients}
      price={totalPrice}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
  );

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
}

export default BurgerBuilder;
