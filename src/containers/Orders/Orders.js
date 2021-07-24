import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

function Orders() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.order.loading);
  const ordersfromCloud = useSelector((state) => state.order.orders);

  useEffect(() => {
    dispatch(actions.fetchOrders());
  }, [dispatch]);

  let orders = ordersfromCloud.map((order) => (
    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
  ));
  return <div>{loading ? <Spinner /> : orders}</div>;
}

export default Orders;
