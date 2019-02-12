import React, { Component } from "react";
import axios from "axios";
import "./isbn.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import green from "@material-ui/core/colors/green";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    margin: theme.spacing.unit
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  },
  typography: { useNextVariants: true }
});

class Isbn extends Component {
  constructor() {
    super();
    this.state = {
      isbn: "",
      data: []
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
    axios.get(`/api/dashboard/${this.state.isbn}`).then(response => {
      console.log(response.data);

      this.setState({ data: response.data });
      this.setState({ isbn: " " });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="isbn_container">
        <div className="sub_isbn_container">
          <div className="isbn">
            <MuiThemeProvider theme={theme}>
              <TextField
                className={classes.margin}
                label="MuiThemeProvider"
                id="mui-theme-provider-standard-input"
                value={this.state.isbn}
                onChange={e => this.handleChange(e.target.value)}
                required
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
    );
  }
}

Isbn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Isbn);
