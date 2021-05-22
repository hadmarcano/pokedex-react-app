import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../containers/Home";
import Grid from "../containers/Grid";
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";
import AppContext from "../context/AppContext";
import useInitialState from "../hooks/useInitialState";

function App() {
  const initialState = useInitialState();
  return (
    <AppContext.Provider value={initialState}>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" component={Grid} />
          {/* <Route exact path="/tournaments" component={Tournaments} /> */}
          <Route path="/" component={NotFound} />
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
