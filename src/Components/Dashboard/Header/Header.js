import React, { Component } from "react";
import "./Header.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const styles = {
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
    border: "1px solid black",
    marginTop: 10,
    margin: "0 auto"
  }
};
class Header extends Component {
  constructor() {
    super();
    this.state = {
      top: false
    };
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { classes } = this.props;
    const fullList = (
      <div className={classes.fullList}>
        <List>
          {["Dashboard", "Inventory", "Charts", "Profile"].map(
            (text, index) => (
              <Link component={RouterLink} to={`/${text}`}>
                <ListItem button key={text}>
                  <ListItemText className={classes.text} primary={text} />
                </ListItem>
              </Link>
            )
          )}
          <ListItem button>
            <ListItemText className={classes.text} primary="Logout" />
          </ListItem>
        </List>
      </div>
    );
    return (
      <div className="drawer">
        <Button
          className={classes.button}
          onClick={this.toggleDrawer("top", true)}
        >
          OPEN
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
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
