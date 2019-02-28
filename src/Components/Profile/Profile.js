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
import { TextField } from "@material-ui/core";
import { S3_Access_Key_ID, S3_Secret_Access_Key } from "./keys";
import S3 from "aws-s3";

const styles = theme => ({
  bigAvatar: {
    margin: "0 auto",
    width: 150,
    height: 150,
    marginTop: 75
  },
  formControl: {
    margin: "0 auto",
    marginTop: 30,
    color: "#fff"
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
  },
  inputFile: {
    opacity: 0
  },
  cloudIcon: {
    position: "absolute",
    margin: "0 auto"
  }
});

const config = {
  bucketName: "profilepictures1",
  region: "us-east-2",
  accessKeyId: S3_Access_Key_ID,
  secretAccessKey: S3_Secret_Access_Key
};

const S3Client = new S3(config);

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      newEmail: "",
      profilePic: "",
      editToggle: true
    };
  }

  componentDidMount() {
    this.props.getUser();
  }

  verifyLogin = () => {
    console.log(this.props.state.reducer.err);

    if (this.props.state.reducer.err) {
      this.props.history.push("/");
      console.log(this.props.state.reducer.err);
    }
  };

  editToggle = () => {
    this.setState({ editToggle: !this.state.editToggle });
  };

  handleChange = val => {
    this.setState({ newEmail: val });
  };

  saveChanges = () => {
    const { newEmail, profilePic } = this.state;
    const { id } = this.props.state.reducer.user;

    axios
      .put(`/auth/editUser/${id}`, { newEmail, profilePic })
      .then(response => {
        this.setState(
          {
            editToggle: true
          },
          () => {
            this.props.getUser();
          }
        );
      });
  };

  upload = e => {
    console.log(e.target.files[0]);
    S3Client.uploadFile(e.target.files[0])
      .then(data => {
        console.log(data);
        this.setState({ profilePic: data.location });
        console.log(this.state.profilePic);
      })
      .catch(err => console.error(err));
  };

  render() {
    // this.verifyLogin();
    const { classes } = this.props;
    const { username, email, image } = this.props.state.reducer.user;
    return (
      <div className="entireprofile">
        <Header />
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className={classes.name}>
                <h2>{username}</h2>
              </div>
              <Avatar
                alt="Profile Picture"
                src={image}
                className={classes.bigAvatar}
              />
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
                  <InputLabel htmlFor="component-disabled" />
                  <Input id="component-disabled" value={email} />
                  <FormHelperText>Email </FormHelperText>
                </FormControl>
              ) : (
                <FormControl className={classes.formControlfalse}>
                  <InputLabel htmlFor="component-simple">New Email</InputLabel>
                  <Input
                    id="component-simple"
                    onChange={e => this.handleChange(e.target.value)}
                    value={email}
                  />
                  <FormHelperText>Email - Edit </FormHelperText>

                  <Button
                    id="hello"
                    variant="contained"
                    color="primary"
                    className={classes.uploadButton}
                  >
                    Upload
                    <TextField
                      type="file"
                      onChange={this.upload}
                      className={classes.inputFile}
                    />
                    <CloudUploadIcon className={classes.cloudIcon} />
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
