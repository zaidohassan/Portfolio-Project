import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import store from "../src/Components/ducks/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">{routes}</div>
        </Router>
      </Provider>
    );
  }
}

export default App;
