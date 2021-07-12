import React, { useState } from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import ToolBar from "../../components/Navigation/Toolbar/ToolBar";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";

function Layout(props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer((prevState) => !prevState.showSideDrawer);
  };

  return (
    <Aux>
      <ToolBar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
}

export default Layout;
