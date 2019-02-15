import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  button: {
    margin: "0 auto"
  },
  xbutton: {
    transform: "rotate(45deg)"
  }
});

class Buttons extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={this.props.handleAdd}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
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
