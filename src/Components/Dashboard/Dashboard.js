import React, { Component } from "react";
import axios from "axios";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      isbn: ""
    };
  }

  handleChange(val) {
    if (val.includes("-")) {
      val = val.split("-").join("");
      this.setState({ isbn: val });
    }
    this.setState({ isbn: val });
    console.log(val);
  }

  handleClick() {
    axios.get(`/api/dashboard/${this.state.isbn}`).then(response => {
      console.log(response);
      this.setState({ isbn: " " });
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.isbn}
          onChange={e => this.handleChange(e.target.value)}
        />
        <button onClick={() => this.handleClick()}>Go</button>
        <input
          type="date"
          value={this.state.date}
          onChange={e => {
            this.setState({ date: e.target.value });
          }}
        />
      </div>
    );
  }
}
