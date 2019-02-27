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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: "0 auto"
  },
  button: {
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#1e81ce"
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

class Isbn extends Component {
  constructor() {
    super();
    this.state = {
      isbn: "",
      book: {},
      inputPrice: "",
      costOfGood: "",
      totalFbaFee: "",
      profitFBA: "",
      mfFees: "",
      mfProfit: "",
      totalBooks: "",
      errorIsbn: false,
      allowInputPrice: false,
      toggleReject: false,
      dividerToggle: false,
      disabled: false
    };
  }

  handleChange(val) {
    if (val.includes("-")) {
      val = val.split("-").join("");
    }
    this.setState({ isbn: val });
  }

  handleClick = () => {
    if (!this.state.book.title) {
      axios
        .get(`/api/dashboard/${this.state.isbn}`)
        .then(response => {
          this.setState({
            book: response.data,
            isbn: "",
            allowInputPrice: true,
            toggleReject: true,
            dividerToggle: true,
            disabled: true
          });
          console.log(this.state.dividerToggle);
        })
        .catch(err => this.setState({ errorIsbn: true }));
    }
  };

  handleInputPrice = val => {
    this.setState({ inputPrice: val });
  };

  handleCostofGood = val => {
    this.setState({ costOfGood: val });
  };

  getFees = () => {
    if (this.state.allowInputPrice & this.state.toggleReject) {
      const { inputPrice, costOfGood } = this.state;
      const { height, width, length, weight } = this.state.book.dims;
      const cubicFoot = height * width * length;
      const small = cubicFoot <= 135; // amazon categories products by weight and cubic feet to calculate fee
      const large = cubicFoot > 135;
      let fixedFee = Math.round((inputPrice * 0.15 + 1.8) * 100) / 100;
      let fbaFee = Math.round(fbaFee * 100) / 100;

      if (small && weight < 1) {
        fbaFee = fixedFee + 2.41;
      } else if (large && weight < 1) {
        fbaFee = fixedFee + 3.19;
      } else if (large && weight > 1 && weight < 2) {
        fbaFee = fixedFee + 4.71;
      } else {
        fbaFee = fixedFee + 4.71 + (weight - 2 * 0.38);
      }
      this.setState({
        totalFbaFee: fbaFee.toFixed(2),
        profitFBA: (inputPrice - fbaFee - costOfGood).toFixed(2),
        mfFees: fixedFee,
        mfProfit: (inputPrice - fixedFee - costOfGood).toFixed(2),
        inputPrice: ""
      });
      console.log(this.state.inputPrice);
    }
  };

  handleReject = () => {
    if (this.state.book.title) {
      let reset = Object.assign({}, this.state);
      reset.book.title = "";
      reset.book.binding = "";
      reset.book.imageURL = "";
      reset.book.salesRank = "";
      reset.book.usedBuyBoxPrice = "";
      reset.book.dims.height = 0;
      reset.book.dims.length = 0;
      reset.book.dims.weight = 0;
      reset.book.dims.width = 0;
      reset.inputPrice = "";
      reset.totalFbaFee = "";
      reset.profitFBA = "";
      reset.mfFees = "";
      reset.mfProfit = "";
      reset.dividerToggle = !this.state.dividerToggle;
      this.setState({
        book: reset,
        inputPrice: "",
        totalFbaFee: "",
        profitFBA: "",
        mfFees: "",
        mfProfit: "",
        toggleReject: false,
        disabled: false,
        dividerToggle: !this.state.dividerToggle
      });
    }
  };

  handleAdd = () => {
    const { profitFBA, totalFbaFee, mfProfit, mfFees, costOfGood } = this.state;
    const {
      title,
      binding,
      salesRank,
      usedBuyBoxPrice,
      imageURL,
      ASIN
    } = this.state.book;
    if (title) {
      axios
        .post("/api/addBook", {
          profitFBA,
          totalFbaFee,
          mfProfit,
          mfFees,
          costOfGood,
          title,
          binding,
          salesRank,
          usedBuyBoxPrice,
          imageURL,
          ASIN
        })
        .then(response => {
          toast.success("Oh Yeahh", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
            closeOnClick: true
          });
          this.setState({ disabled: false });
          this.handleReject();
        });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="isbn_container">
          <MuiThemeProvider theme={theme}>
            <div className="sub_isbn_container">
              <div className="isbn">
                <TextField
                  className={classes.margin}
                  label="ISBN"
                  value={this.state.isbn}
                  onChange={e => this.handleChange(e.target.value)}
                  error={this.state.errorIsbn}
                  helperText={this.state.errorIsbn ? "Invalid ISBN" : " "}
                  autoFocus={true}
                  disabled={this.state.disabled ? true : null}
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
          isbn={this.state}
          handleInputPrice={this.handleInputPrice}
          handleCostofGood={this.handleCostofGood}
          getFees={this.getFees}
          reject={this.handleReject}
          handleAdd={this.handleAdd}
          dividers={this.state.dividerToggle}
        />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

Isbn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Isbn);
