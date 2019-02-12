import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import { toast } from "react-toastify";
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
      .then(user => {
        toast("Default Notification !");
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_CENTER
        });
        this.props.history.push("/Dashboard");
        this.setState({
          username: "",
          password: ""
        });
      })
      .catch(error => alert(error.response.request.response));
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="entireapp">
        <div className="aside">
          <div className="textaside">
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
                  {" "}
                  LogIn
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
