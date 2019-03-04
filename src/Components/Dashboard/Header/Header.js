import React, { Component } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./Header.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";
import axios from "axios";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  text: {
    textAlign: "center"
  },
  button: {
    textAlign: "center",
    border: "1.5px solid #e82c0c",
    marginTop: 10,
    margin: "0 auto",
    backgroundColor: "#fff"
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff5722"
    }
  },
  typography: { useNextVariants: true }
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  logout = () => {
    axios
      .get("/auth/logout")
      .then(res => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch(err => console.log("Error", err));
  };

  render() {
    const { classes } = this.props;
    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Dashboard", "Inventory", "Charts", "Profile"].map((text, i) => (
            <Link component={RouterLink} to={`/${text}`} key={i}>
              <ListItem button key={text}>
                <ListItemText className={classes.text} primary={text} />
              </ListItem>
            </Link>
          ))}
          <ListItem button>
            <ListItemText
              className={classes.text}
              onClick={this.logout}
              primary="Logout"
            />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div className="drawer">
        <MuiThemeProvider theme={theme}>
          <Button
            className={classes.button}
            onClick={this.toggleDrawer("top", true)}
          >
            MENU
          </Button>
          <SwipeableDrawer
            anchor="top"
            open={this.state.top}
            onClose={this.toggleDrawer("top", false)}
            onOpen={this.toggleDrawer("top", true)}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer("top", false)}
              onKeyDown={this.toggleDrawer("top", false)}
            >
              {fullList}
            </div>
          </SwipeableDrawer>
        </MuiThemeProvider>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(Header));
