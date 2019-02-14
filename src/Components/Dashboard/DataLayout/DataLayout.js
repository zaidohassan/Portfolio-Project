import React, { Component } from "react";
import Buttons from "../Dashboard/accept_reject";
import "./DataLayout.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    margin: "0 auto",
    marginTop: 20
  },
  card: {
    width: 800,
    margin: "0 auto"
  },
  list: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto"
  },
  divs: {
    marginRight: 50
  },
  button: {
    backgroundColor: "#ff5722",
    color: "white"
  },
  actionbutton: {
    margin: "0 auto",
    textAlign: "center"
  },
  inputs: {
    display: "flex"
  },
  input: {
    marginRight: 10
  },
  [theme.breakpoints.down("sm")]: {
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginRight: 50
    },
    listtext: {
      primary: { fontWeight: 600 }
    },
    card: {
      width: 370
    },
    cards: {
      width: 350,
      display: "flex",
      flexDirection: "column"
    }
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ff5722"
    },
    secondary: {
      main: "#3300ff"
    }
  },
  typography: { useNextVariants: true }
});

class DataLayout extends Component {
  constructor() {
    super();
    this.state = {
      inputPrice: "",
      costOfGood: 0,
      totalFbaFee: 0,
      profitFBA: 0,
      mfFees: 0,
      mfProfit: 0
    };
  }

  // 9780073398181
  // 9780133887518

  handleInputPrice = val => {
    // const index = val.findIndex(".");
    // console.log(index);

    this.setState({ inputPrice: val });
  };

  handleCostofGood = val => {
    this.setState({ costOfGood: val });
  };

  getFees = () => {
    if (this.props.allowedInput.allowInputPrice) {
      console.log(this.props);

      const { inputPrice, costOfGood } = this.state;
      const { height, width, length, weight } = this.props.data.dims;
      const cubicFoot = (height * width * length) / 1728;
      const small = cubicFoot < 135; // amazon categories products by weight and cubic feet to calculate fee
      const large = cubicFoot > 136;
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
    }
  };

  render() {
    const { classes, isbn } = this.props;
    const {
      title,
      binding,
      salesRank,
      usedBuyBoxPrice,
      imageURL
    } = this.props.data;
    const { mfFees, mfProfit, profitFBA, totalFbaFee, inputPrice } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.actionbutton}>
          <Buttons layout={this.state} isbn={isbn} />
        </div>
        <Card className={classes.card}>
          <CardContent className={classes.cards}>
            <div className={classes.inputs}>
              <Input
                placeholder="Input Price"
                className={classes.input}
                onChange={e => {
                  this.handleInputPrice(e.target.value);
                }}
                value={this.state.inputPrice}
                color="primary"
              />
              <Input
                placeholder="Cost of Good"
                className={classes.input}
                onChange={e => {
                  this.handleCostofGood(e.target.value);
                }}
                color="primary"
              />
              <Button
                variant="contained"
                size="small"
                className={classes.button}
                onClick={() => {
                  if (inputPrice) {
                    this.getFees();
                  }
                }}
                color="primary"
              >
                GO
              </Button>
            </div>
            <MuiThemeProvider theme={theme}>
              <List className={classes.list}>
                <div className={classes.divs}>
                  <ListItem>
                    <ListItemText
                      className={classes.listtext}
                      primary="Title"
                      secondary={title ? title : "Title"}
                    />
                  </ListItem>
                  <Divider variant="Title" color="secondary" />

                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Image"
                      secondary={
                        imageURL ? (
                          <img src={imageURL} alt="Book Cover" />
                        ) : (
                          "Image"
                        )
                      }
                      className={classes.listitemtext}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />

                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Binding"
                      secondary={binding ? binding : "Binding"}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                </div>
                <div className={classes.divs}>
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Used BuyBox Price"
                      secondary={
                        usedBuyBoxPrice
                          ? usedBuyBoxPrice
                          : "Competitive BuyBox Price"
                      }
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Sales Rank"
                      secondary={salesRank ? salesRank : "Sales Rank"}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                </div>

                <div className={classes.divs}>
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Total FBA Fees"
                      secondary={totalFbaFee ? totalFbaFee : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Profit FBA"
                      secondary={profitFBA ? profitFBA : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                </div>
                <div>
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Total MF Fees"
                      secondary={mfFees ? mfFees : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Total MF Profit"
                      secondary={mfProfit ? mfProfit : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                </div>
              </List>
            </MuiThemeProvider>
          </CardContent>
        </Card>
      </div>
    );
  }
}

DataLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataLayout);
