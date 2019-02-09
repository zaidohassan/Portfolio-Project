import React, { Component } from "react";
// import axios from "axios";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      login: true
    };
  }

  render() {
    return (
      <div>
        <p> Hello</p>
      </div>
    );
  }
}
