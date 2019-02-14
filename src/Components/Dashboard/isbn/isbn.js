import "date-fns";
import React, { Component } from "react";
import axios from "axios";
import "./isbn.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DataLayout from "../DataLayout/DataLayout";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: "0 auto"
  },
  button: {
    marginTop: 10
  },
  calendar: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    display: "none"
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

class Isbn extends Component {
  constructor() {
    super();
    this.state = {
      isbn: "",
      book: [],
      errorIsbn: false,
      allowInputPrice: false,
      selectedDate: this.handleDateChange(new Date())
    };
  }

  handleChange(val) {
    if (val.includes("-")) {
      val = val.split("-").join("");
      this.setState({ isbn: val });
    }
    this.setState({ isbn: val });
    console.log(val);
  }

  handleClick = () => {
    axios
      .get(`/api/dashboard/${this.state.isbn}`)
      .then(response => {
        // console.log(response.data);
        this.setState({
          book: response.data,
          isbn: " ",
          allowInputPrice: true
        });
      })
      .catch(err => this.setState({ errorIsbn: true }));
  };

  handleDateChange = date => {
    if (date) {
      const newDate =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      return newDate;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="isbn_container">
          <MuiThemeProvider theme={theme}>
            <div className={classes.calendar}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  label="Today's Date"
                  onChange={this.handleDateChange}
                  disableFuture={true}
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className="sub_isbn_container">
              <div className="isbn">
                <TextField
                  className={classes.margin}
                  label="ISBN"
                  // id="mui-theme-provider-standard-input"
                  value={this.state.isbn}
                  onChange={e => this.handleChange(e.target.value)}
                  error={this.state.errorIsbn}
                  helperText={this.state.errorIsbn ? "Invalid ISBN" : " "}
                  autoFocus={true}
                />
                <Button
                  color="primary"
                  size="small"
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.handleClick()}
                >
                  GO
                </Button>
              </div>
            </div>
          </MuiThemeProvider>
        </div>
        <DataLayout
          data={this.state.book}
          allowedInput={this.state}
          isbn={this.state}
        />
      </div>
    );
  }
}

Isbn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Isbn);
