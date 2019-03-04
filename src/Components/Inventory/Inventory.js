import "date-fns";
import React, { Component } from "react";
import Header from "../Dashboard/Header/Header";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Desktop from "./inventory_Desktopview";
import Mobile from "./inventory_mobileview";
import axios from "axios";

const styles = theme => ({
  calendar: {
    color: "#ff5722",
    textAlign: "center",
    marginTop: 20
  },
  mobile: {
    display: "none"
  },
  header: {
    textAlign: "center"
  },
  [theme.breakpoints.down("sm")]: {
    mobile: {
      display: "flex"
    },
    desktop: {
      display: "none"
    }
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
      todaysDate: this.handleTodaysChange(new Date()),
      selectedDate: new Date(),
      newDate: this.handleTodaysChange(new Date()),
      inventoryList: []
    };
  }

  componentDidMount() {
    const { todaysDate } = this.state;
    axios.post("/api/getTodaysBooks", { todaysDate }).then(response => {
      console.log(response.data);
      this.setState({ inventoryList: response.data });
    });
  }

  getInventory = () => {
    const { newDate } = this.state;
    console.log(newDate);
    axios.post("/api/getBook", { newDate }).then(response => {
      console.log(response.data);
      this.setState({ inventoryList: response.data });
    });
  };
  handleTodaysChange = date => {
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

      return MyDateString;
    }
  };
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
    this.setState(
      {
        selectedDate: date,
        newDate,
        todaysDate: newDate
      },
      () => {
        this.getInventory(newDate);
      }
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.header}>
          <Header className={classes.button} />
        </div>
        <MuiThemeProvider theme={theme}>
          <div className={classes.calendar}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Date"
                onChange={this.handleDateChange}
                disableFuture={true}
                value={this.state.selectedDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </MuiThemeProvider>
        <div className={classes.desktop}>
          <Desktop
            display={this.state.inventoryList}
            getInventory={this.getInventory}
          />
        </div>
        <div className={classes.mobile}>
          <Mobile
            display={this.state.inventoryList}
            getInventory={this.getInventory}
          />
        </div>
      </div>
    );
  }
}

Inventory.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Inventory);
