import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Reviews from "./Reviews";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  updateInput = e => {
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .post("/auth/login", { username, password })
      .then(res => {
        this.props.history.push("/Dashboard");
        this.setState({
          username: "",
          password: ""
        });
      })
      .catch(error => {
        toast.error("Failed Login", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
          closeOnClick: true
        });
      });
  };

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;
    return (
      <div className="entireapp">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <div className="aside">
          <div className="textaside">
            <h2> Welcome to Book Scout</h2>
            <h2> Revolutionized BookSelling App</h2>
            <h3> </h3>
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
                <input
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={this.updateInput}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.updateInput}
                  required
                />
                <button className="loginbutton" onClick={this.login}>
                  LogIn
                </button>
              </form>
            </div>
          </div>
          <Reviews />
        </section>
      </div>
    );
  }
}
