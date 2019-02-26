import React, { Component } from "react";
import Header from "../Dashboard/Header/Header";
import "./Profile.css";
import { connect } from "react-redux";
import { getUser } from "../ducks/reducer";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";

const styles = theme => ({
  bigAvatar: {
    margin: "0 auto",
    width: 150,
    height: 150,
    marginTop: 75
  },
  formControl: {
    margin: "0 auto"
  },
  label: {
    color: "white",
    background: "white"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  formControlfalse: {
    marginTop: 20
  },
  name: {
    textAlign: "center",
    marginTop: 30,
    marginLeft: 10
  },
  uploadButton: {
    width: 260
  },
  icon: {
    margin: theme.spacing.unit * 2
  }
});

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      editToggle: true,
      newEmail: ""
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
    console.log(this.state.profile);
  };

  editToggle = () => {
    this.setState({ editToggle: !this.state.editToggle });
    console.log(this.state.editToggle);
  };

  handleChange = val => {
    this.setState({ newEmail: val });
    console.log(this.state.newEmail);
  };

  saveChanges = () => {
    const { newEmail } = this.state;
    const { id } = this.state.profile;
    console.log(this.state.profile.id);

    axios.put(`/auth/editUser/${id}`, { newEmail }).then(response => {
      console.log(response);
      this.setState({
        editToggle: true,
        profile: response.data
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="entireprofile">
        <Header />
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <Avatar alt="" src="" className={classes.bigAvatar} />
            </div>
            <div className="flip-card-back">
              <span>
                <img
                  src="https://image.flaticon.com/icons/svg/70/70367.svg"
                  alt="edit"
                  onClick={() => this.editToggle()}
                  id="image"
                />
              </span>

              {this.state.editToggle ? (
                <FormControl className={classes.formControl} disabled>
                  <div className={classes.name}>
                    <h2>{this.state.profile.username}</h2>
                  </div>
                  <InputLabel htmlFor="component-disabled" />
                  <Input
                    id="component-disabled"
                    value={this.state.profile.email}
                  />
                  <FormHelperText>Email</FormHelperText>
                </FormControl>
              ) : (
                <FormControl className={classes.formControlfalse}>
                  <InputLabel htmlFor="component-simple">New Email</InputLabel>
                  <Input
                    id="component-simple"
                    onChange={e => this.handleChange(e.target.value)}
                    value={this.state.newEmail}
                  />
                  <FormHelperText>Email - Edit </FormHelperText>

                  <Button
                    id="hello"
                    variant="contained"
                    color="primary"
                    type="file"
                    className={classes.uploadButton}
                  >
                    <Input type="file" />
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>

                  <Button
                    variant="raised"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={() => this.saveChanges()}
                  >
                    <SaveIcon
                      className={classNames(
                        classes.leftIcon,
                        classes.iconSmall
                      )}
                    />
                    Save
                  </Button>
                </FormControl>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return { state };
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    mapStatetoProps,
    { getUser }
  )(Profile)
);
