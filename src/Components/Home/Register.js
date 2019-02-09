import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Register.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
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
                <Link to="/">
                  <h1> Sign in</h1>
                </Link>
                <h1> Sign Up</h1>
              </div>
              <form>
                <input type="text" name="" placeholder="Username" />
                <input type="password" name="" placeholder="Password" />
                <input type="text" name="" placeholder="Email" />
                <button> Register</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
