import { Route, Switch } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={BurgerBuilder} />
          <Route path="/orders" component={BurgerBuilder} />
          <Route path="/auth" component={BurgerBuilder} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
