import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="entireapp">
        <div className="aside">
          <div>
            <p> Welcome to Bookers</p>
            <p> Your Revolutionized BookSelling App</p>
          </div>
        </div>
        <section>
          <div className="container">
            <div className="login-form">
              <div className="tabs">
                <h1> Sign in</h1>
                <Link to="/Register">
                  <h1> Sign Up</h1>
                </Link>
              </div>
              <form>
                <input type="text" name="" placeholder="Username" />
                <input type="password" name="" placeholder="Password" />
                <button> LogIn</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
