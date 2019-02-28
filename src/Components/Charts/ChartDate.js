import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Chart from "./Charts";
import Header from "../Dashboard/Header/Header";

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

class ChartDate extends Component {
  constructor() {
    super();
    this.state = {
      todaysDate: this.handleTodaysChange(new Date()),
      selectedDate: new Date()
    };
  }

  handleDateChange = date => {
    let newDate = "";
    if (date) {
      let MyDate = date;
      let MyDateString;
      MyDate.setDate(MyDate.getDate());
      MyDateString =
        MyDate.getFullYear() +
        "-" +
        ("0" + (MyDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDate.getDate()).slice(-2);
      newDate = MyDateString;
    }
    this.setState({
      selectedDate: date,
      todaysDate: newDate
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
                label="Date"
                onChange={this.handleDateChange}
                // disableFuture={true}
                value={this.state.selectedDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </MuiThemeProvider>
        <Chart todaysDate={this.state.todaysDate} />
      </div>
    );
  }
}

ChartDate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChartDate);
