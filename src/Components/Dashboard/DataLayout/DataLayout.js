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
import book from "../../../book.svg";
import ranking from "../../../ranking.svg";
import classNames from "classnames";

const styles = theme => ({
  root: {
    width: "100%",
    margin: "0 auto",
    marginTop: -10
  },
  card: {
    margin: "0 auto",
    marginTop: 30
  },
  bookDetailCard: {
    width: 500
  },
  cards: {
    display: "flex",
    width: 1100,
    margin: "0 auto"
  },
  list: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto"
  },
  booklist: {
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    height: 120
  },
  divs: {
    marginRight: 50
  },
  button: {
    backgroundColor: "#ff5722",
    color: "white",
    "&:hover": {
      backgroundColor: "#1e81ce"
    }
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
  listtext: {
    secondary: {
      textAlign: "left"
    }
  },
  dividers: {
    backgroundColor: "#ff5722"
  },
  [theme.breakpoints.down("749")]: {
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginRight: 50
    },
    listtext: {
      primary: { fontWeight: 600 }
    },
    cards: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
      margin: "0 auto",
      marginTop: -15
    },
    listtexttitle: {
      marginRight: 100
    },
    p: {
      textAlign: "left"
    },
    inputCard: {
      marginTop: 3
    },
    bookDetailCard: {
      width: "auto"
    }
  },
  [theme.breakpoints.between("sm", "md")]: {
    cards: {
      display: "flex",
      flexDirection: "column",
      width: "auto"
    },
    background: {
      height: 100
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
  // 9780073398181
  // 9780133887518
  //  9780439136358
  render() {
    const { classes, isbn, reject, handleAdd } = this.props;
    const {
      title,
      binding,
      salesRank,
      usedBuyBoxPrice,
      imageURL
    } = this.props.data;

    return (
      <div className={classes.root}>
        <div className={classes.actionbutton}>
          <Buttons isbn={isbn} reject={reject} handleAdd={handleAdd} />
        </div>
        <div className={classes.cards}>
          <Card className={classNames(classes.bookDetailCard, classes.card)}>
            <CardContent className={classes.CardContent}>
              <MuiThemeProvider theme={theme}>
                <List className={classes.list}>
                  <div className={classes.divs}>
                    <ListItem className={classes.list}>
                      <img
                        src={book}
                        alt="book"
                        id="book"
                        className={title ? "animated heartBeat" : null}
                      />
                      <ListItemText
                        primary="Title"
                        secondary={title ? title : "Title"}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      className={title ? classes.dividers : null}
                    />

                    <ListItem className={classes.booklist}>
                      <img
                        src={book}
                        alt="book"
                        id="book"
                        className={title ? "animated heartBeat" : null}
                      />
                      <ListItemText
                        primary="Image"
                        secondary={
                          imageURL ? (
                            <img
                              src={imageURL}
                              alt="Book Cover"
                              id="bookimage"
                            />
                          ) : (
                            "Image"
                          )
                        }
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={title ? classes.dividers : null}
                    />

                    <ListItem className={classes.list}>
                      <img
                        src={book}
                        alt="book"
                        id="book"
                        className={title ? "animated heartBeat" : null}
                      />

                      <ListItemText
                        primary="Binding"
                        secondary={binding ? binding : "Binding"}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={title ? classes.dividers : null}
                    />
                  </div>
                  <div className={classes.divs}>
                    <ListItem className={classes.list}>
                      <img
                        src={ranking}
                        alt="book"
                        id="book"
                        className={title ? "animated heartBeat" : null}
                      />
                      <ListItemText
                        primary="Used BuyBox Price"
                        secondary={
                          usedBuyBoxPrice ? usedBuyBoxPrice : "BuyBox Price"
                        }
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={title ? classes.dividers : null}
                    />
                    <ListItem className={classes.list}>
                      <img
                        src={ranking}
                        alt="book"
                        id="book"
                        className={title ? "animated heartBeat" : null}
                      />
                      <ListItemText
                        primary="Sales Rank"
                        secondary={salesRank ? salesRank : "Sales Rank"}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={title ? classes.dividers : null}
                    />
                  </div>
                </List>
              </MuiThemeProvider>
            </CardContent>
          </Card>

          <Card className={classNames(classes.card, classes.inputCard)}>
            <CardContent>
              <div className={classes.inputs}>
                <Input
                  placeholder="Input Price"
                  className={classes.input}
                  onChange={e => {
                    this.props.handleInputPrice(e.target.value);
                  }}
                  value={isbn.inputPrice}
                  color="primary"
                  disabled={isbn.disabled ? null : true}
                />
                <Input
                  placeholder="Cost of Good"
                  className={classes.input}
                  onChange={e => {
                    this.props.handleCostofGood(e.target.value);
                  }}
                  color="primary"
                  disabled={isbn.disabled ? null : true}
                  // value={isbn.costOfGood}  // the COGs should stay because usually with suppliers they are set on the same price
                />
                <Button
                  variant="contained"
                  size="small"
                  className={classes.button}
                  onClick={() => {
                    if (isbn.inputPrice) {
                      this.props.getFees();
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
                    <ListItem className={classes.list}>
                      <ListItemText
                        primary="Total FBA Fees"
                        secondary={isbn.totalFbaFee ? isbn.totalFbaFee : null}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={isbn.profitFBA ? classes.dividers : null}
                    />

                    <ListItem className={classes.list}>
                      <ListItemText
                        primary="Profit FBA"
                        secondary={isbn.profitFBA ? isbn.profitFBA : null}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={isbn.profitFBA ? classes.dividers : null}
                    />
                  </div>

                  <div>
                    <ListItem className={classes.list}>
                      <ListItemText
                        primary="Total MF Fees"
                        secondary={isbn.mfFees ? isbn.mfFees : null}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={isbn.profitFBA ? classes.dividers : null}
                    />
                    <ListItem>
                      <ListItemText
                        primary="Merchant Fulfilled Profit"
                        secondary={isbn.mfProfit ? isbn.mfProfit : null}
                      />
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      component="li"
                      className={isbn.profitFBA ? classes.dividers : null}
                    />
                  </div>
                </List>
              </MuiThemeProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

DataLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataLayout);
