import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import OrderSummary from "../../components/Burger/OrderSummery/OrderSummery";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

function BurgerBuilder(props) {
  const dispatch = useDispatch();
  const burgerIngredients = useSelector(
    (state) => state.burgerBuilder.ingredients
  );
  const totalPrice = useSelector((state) => state.burgerBuilder.totalPrice);

  const [purchasable, setPurchasable] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState({});
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (burgerIngredients) {
      setPurchasable(updatePurchaseState(burgerIngredients));
      buttonDisableCheck(burgerIngredients);
    }
  }, [burgerIngredients]);

  const onAddIngredient = (type) => {
    dispatch(actions.addIngredient(type));
  };

  const onRemoveIngredient = (type) => {
    dispatch(actions.removeIngredient(type));
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
    dispatch(actions.purchaseInit());
    props.history.push("/checkout");
  };

  const burger = burgerIngredients ? (
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
  ) : (
    <Spinner />
  );

  const orderSummary = burgerIngredients ? (
    <OrderSummary
      ingredients={burgerIngredients}
      price={totalPrice}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />
  ) : null;

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
