import "date-fns";
import React, { Component } from "react";
import Header from "../Dashboard/Header/Header";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  calendar: {
    color: "#ff5722",
    textAlign: "center",
    marginTop: 20
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

class Inventory extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date(),
      newDate: ""
    };
  }

  handleDateChange = date => {
    let newDate = "";
    if (date) {
      newDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    }
    this.setState({
      selectedDate: date,
      newDate: newDate
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <MuiThemeProvider theme={theme}>
          <div className={classes.calendar}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Today's Date"
                onChange={this.handleDateChange}
                disableFuture={true}
                value={this.state.selectedDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Inventory);
