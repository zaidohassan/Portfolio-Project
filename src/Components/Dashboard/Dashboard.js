import React, { Component } from "react";
import Header from "./Header/Header";
import Isbn from "./isbn/isbn";
import "./Dashboard.css";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      profile: []
    };
  }

  async componentDidMount() {
    if (!this.state.profile) {
      this.props.history.push("/");
    } else {
      await this.props.getUser();
      this.setProfileInfo();
    }
  }

  setProfileInfo = () => {
    console.log(this.props.state.reducer.user);
    if (!this.props.state.reducer.user) {
      this.props.history.push("/");
    }
    this.setState({ profile: this.props.state.reducer.user });
  };
  render() {
    return (
      <div className="components">
        <Header updateUser={this.state} />
        <Isbn />
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return { state };
}

export default connect(
  mapStatetoProps,
  { getUser }
)(Dashboard);
