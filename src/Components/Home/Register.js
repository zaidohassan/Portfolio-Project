import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./Register.css";
import axios from "axios";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: ""
    };
  }

  updateInput = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  register = e => {
    e.preventDefault();
    const { username, password, email } = this.state;
    axios
      .post("/auth/register", { username, password, email })
      .then(register => {
        console.log(register.data);

        this.setState({
          username: "",
          password: "",
          email: ""
        });
      });
  };
  render() {
    const { username, password, email } = this.state;
    return (
      <div className="entireapp">
        <div className="aside">
          <div className="textaside">
            <h2> Welcome to Bookers</h2>
            <h2> Your Revolutionized BookSelling App</h2>
            <h3> </h3>
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
              <form onSubmit={this.register}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={this.updateInput}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.updateInput}
                  required
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.updateInput}
                />
                <input type="submit" value="Register" className="loginbutton" />
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
