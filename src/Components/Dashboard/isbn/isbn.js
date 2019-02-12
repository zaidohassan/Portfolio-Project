import React, { Component } from "react";
import axios from "axios";
import "./isbn.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import DataLayout from "../DataLayout/DataLayout";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
      errorIsbn: false
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

  handleClick() {
    axios
      .get(`/api/dashboard/${this.state.isbn}`)
      .then(response => {
        console.log(response.data);

        this.setState({ book: response.data });
        this.setState({ isbn: " " });
        this.setState({ errorIsbn: false });
      })
      .catch(err => this.setState({ errorIsbn: true }));
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="isbn_container">
          <div className="sub_isbn_container">
            <div className="isbn">
              <MuiThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="ISBN"
                  // id="mui-theme-provider-standard-input"
                  value={this.state.isbn}
                  onChange={e => this.handleChange(e.target.value)}
                  hintText="Hint Text"
                  errorText="This field is required"
                  error={this.state.errorIsbn}
                  helperText={this.state.errorIsbn ? "Invalid ISBN" : " "}
                />
              </MuiThemeProvider>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={() => this.handleClick()}
              >
                GO
              </Button>
            </div>
          </div>
        </div>
        <DataLayout data={this.state.book} />
      </div>
    );
  }
}

Isbn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Isbn);
