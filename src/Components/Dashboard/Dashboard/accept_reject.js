import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit * 3,
    background: "#E82C0C",
    "&:hover": {
      backgroundColor: "#1e81ce"
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: "0 auto"
  },
  addButton: {
    color: "#ffffff"
  },
  xbutton: {
    transform: "rotate(45deg)",
    color: "#ffffff"
  }
});

class Buttons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab
          aria-label="Add"
          className={classes.fab}
          onClick={this.props.handleAdd}
        >
          <AddIcon className={classes.addButton} />
        </Fab>
        <Fab
          aria-label="Add"
          className={classes.fab}
          onClick={this.props.reject}
        >
          <AddIcon className={classes.xbutton} />
        </Fab>
      </div>
    );
  }
}

Buttons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Buttons);
