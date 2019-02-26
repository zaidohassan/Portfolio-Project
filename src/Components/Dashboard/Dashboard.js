import React, { Component } from "react";
import Header from "./Header/Header";
import Isbn from "./isbn/isbn";
import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="components">
        <Header />
        <Isbn />
      </div>
    );
  }
}

export default Dashboard;
