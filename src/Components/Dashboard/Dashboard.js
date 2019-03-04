import React, { Component } from "react";
import Isbn from "./isbn/isbn";
import "./Dashboard.css";

class Dashboard extends Component {
  render() {
    return (
      <div className="components">
        <Isbn />
      </div>
    );
  }
}

export default Dashboard;
