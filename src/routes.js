import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Home/Register";

export default (
  <Switch>
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/Register" component={Register} />
    <Route exact path="/" component={Home} />
  </Switch>
);
