import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";

export default (
  <Switch>
    <Route path="/Dashboard" component={Dashboard} />
    <Route exact path="/" component={Home} />
  </Switch>
);
