import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Home/Register";
import InventoryList from "./Components/Inventory/Inventory";
import ChartDate from "./Components/Charts/ChartDate";
import Profile from "./Components/Profile/Profile";

export default (
  <Switch>
    <Route path="/Dashboard" component={Dashboard} />
    <Route path="/Register" component={Register} />
    <Route path="/Inventory" component={InventoryList} />
    <Route path="/Charts" component={ChartDate} />
    <Route path="/Profile" component={Profile} />
    <Route exact path="/" component={Home} />
  </Switch>
);
