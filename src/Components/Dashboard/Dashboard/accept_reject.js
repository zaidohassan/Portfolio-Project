import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";

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
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleAdd() {
    const {
      profitFBA,
      totalFbaFee,
      mfProfit,
      mfFees,
      costOfGood
    } = this.props.layout;
    const { selectedDate } = this.props.isbn;
    const {
      title,
      binding,
      salesRank,
      usedBuyBoxPrice,
      imageURL,
      ASIN
    } = this.props.isbn.book;

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
        ASIN,
        selectedDate
      })
      .then(response => {
        console.log(response);
        // add toastify on success on every add
        // add to counter so you keep track of number of books accepted
      });
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => this.handleAdd()}
        >
          <AddIcon />
        </Fab>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
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
