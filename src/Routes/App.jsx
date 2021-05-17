import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "../components/Layout";
import Home from "../containers/Home";
import NotFound from "../components/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
