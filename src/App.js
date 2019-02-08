import React, { Component } from "react";
import "./App.css";
// import axios from "axios";
import { HashRouter as Router } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      date: ""
    };
  }

  handleChange(val) {
    this.setState({ input: val });
    console.log(val);
  }

  handleClick() {}

  render() {
    return (
      <Router>
        <div className="App">
          <input onChange={e => this.handleChange(e.target.value)} />
          <button onClick={() => this.handleClick()}>Go</button>
          <input
            type="date"
            value={this.state.date}
            onChange={e => {
              this.setState({ date: e.target.value });
            }}
          />
          <p> Hello </p>
          <p> Hello </p>
        </div>
      </Router>
    );
  }
}

export default App;
