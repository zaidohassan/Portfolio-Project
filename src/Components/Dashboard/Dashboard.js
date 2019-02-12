import React, { Component } from "react";
// import axios from "axios";
import Header from "./Header/Header";
import Isbn from "./isbn/isbn";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <Isbn />
      </div>
    );
  }
}
