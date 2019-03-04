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
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    margin: "auto"
  },
  card: {
    margin: "0 auto",
    marginTop: 30,
    width: 500
  },
  cards: {
    display: "flex",
    width: 1150,
    margin: "0 auto"
  },
  list: {
    display: "flex"
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
    backgroundColor: "#e82c0c",
    color: "white",
    "&:hover": {
      backgroundColor: "#1e81ce"
    },
    width: 100
  },
  actionbutton: {
    textAlign: "center"
  },
  inputsNbutton: {
    display: "flex",
    alignItems: "center",
    width: "auto"
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
    background: "linear-gradient(to right bottom, #e82c0c, #1e81ce)",
    backgroundRepeat: "repeat-x"
  },
  mobileDisplayIcons: {
    display: "flex",
    alignItems: "center"
  },
  [theme.breakpoints.down("749")]: {
    root: {
      marginTop: -10
    },
    CardContent: {
      padding: 4
    },
    list: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginRight: 60
    },
    mobileDisplayIcons: {
      display: "flex",
      alignItems: "center"
    },
    listtext: {
      primary: { fontWeight: 600 }
    },
    cards: {
      display: "flex",
      flexDirection: "column",
      width: "auto",
      marginTop: -15
    },
    p: {
      textAlign: "left"
    },
    card: {
      width: "auto",
      marginTop: 0
    },
    inputCard: {
      width: "auto",
      marginTop: 5,
      margin: 0
    },
    listitemtext: {
      marginLeft: 10
    },
    actionbutton: {
      marginTop: 30
    },
    input: {
      width: 120
    },
    button: {
      width: 90,
      marginTop: 5
    },
    dividers: {
      width: 400
    },
    bookDetailCard: {
      marginTop: 30,
      margin: 0
    },
    inputsNbutton: {
      padding: 10
    }
  },
  [theme.breakpoints.down("365")]: {
    input: {
      width: 95
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
      main: "#e82c0c"
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
                      <div className={classes.mobileDisplayIcons}>
                        <Tooltip
                          disableFocusListener
                          disableTouchListener
                          placement="top-start"
                          title={
                            imageURL ? (
                              <div className="imageContainer">
                                <img
                                  src={imageURL}
                                  alt="Book Cover"
                                  id="bookimage"
                                  className={classes.imageHover}
                                />
                              </div>
                            ) : (
                              "Book Image"
                            )
                          }
                        >
                          <img
                            src={book}
                            alt="book"
                            id="book"
                            className={title ? "animated heartBeat" : null}
                          />
                        </Tooltip>

                        <ListItemText
                          primary="Title"
                          secondary={title ? title : "Title"}
                          className={classes.listitemtext}
                        />
                      </div>
                    </ListItem>

                    <Divider
                      variant="fullWidth"
                      className={title ? classes.dividers : null}
                    />
                    <ListItem className={classes.list}>
                      <div className={classes.mobileDisplayIcons}>
                        <img
                          src={book}
                          alt="book"
                          id="book"
                          className={title ? "animated heartBeat" : null}
                        />

                        <ListItemText
                          primary="Binding"
                          secondary={binding ? binding : "Binding"}
                          className={classes.listitemtext}
                        />
                      </div>
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      className={title ? classes.dividers : null}
                    />
                  </div>
                  <div className={classes.divs}>
                    <ListItem className={classes.list}>
                      <div className={classes.mobileDisplayIcons}>
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
                          className={classes.listitemtext}
                        />
                      </div>
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      className={title ? classes.dividers : null}
                    />
                    <ListItem className={classes.list}>
                      <div className={classes.mobileDisplayIcons}>
                        <img
                          src={ranking}
                          alt="book"
                          id="book"
                          className={title ? "animated heartBeat" : null}
                        />
                        <ListItemText
                          primary="Sales Rank"
                          secondary={salesRank ? salesRank : "Sales Rank"}
                          className={classes.listitemtext}
                        />
                      </div>
                    </ListItem>
                    <Divider
                      variant="fullWidth"
                      className={title ? classes.dividers : null}
                    />
                  </div>
                </List>
              </MuiThemeProvider>
            </CardContent>
          </Card>

          <Card className={classNames(classes.card, classes.inputCard)}>
            <MuiThemeProvider theme={theme}>
              <CardContent className={classes.CardContent}>
                <div className={classes.inputsNbutton}>
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
                  />

                  <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      this.props.getFees();
                    }}
                    disabled={isbn.inputPrice ? null : true}
                    color="primary"
                  >
                    GET FEES
                  </Button>
                </div>
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
                      className={isbn.profitFBA ? classes.dividers : null}
                    />
                  </div>
                </List>
              </CardContent>
            </MuiThemeProvider>
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
