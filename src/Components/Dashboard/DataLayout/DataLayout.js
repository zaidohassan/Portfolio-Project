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
  listtext: {
    secondary: {
      textAlign: "left"
    }
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
    },
    listtexttitle: {
      marginRight: 100
    },
    p: {
      textAlign: "left"
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
        <Card className={classes.card}>
          <CardContent className={classes.cards}>
            <div className={classes.inputs}>
              <Input
                placeholder="Input Price"
                className={classes.input}
                onChange={e => {
                  this.props.handleInputPrice(e.target.value);
                }}
                value={this.props.isbn.inputPrice}
                color="primary"
              />
              <Input
                placeholder="Cost of Good"
                className={classes.input}
                onChange={e => {
                  this.props.handleCostofGood(e.target.value);
                }}
                color="primary"
                // value={this.props.isbn.costOfGood}  // the COGs should stay because usually with suppliers they are set on the same price
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
                      secondary={isbn.totalFbaFee ? isbn.totalFbaFee : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Profit FBA"
                      secondary={isbn.profitFBA ? isbn.profitFBA : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                </div>
                <div>
                  <ListItem className={classes.list}>
                    <ListItemText
                      primary="Total MF Fees"
                      secondary={isbn.mfFees ? isbn.mfFees : null}
                    />
                  </ListItem>
                  <Divider variant="Title" component="li" />
                  <ListItem>
                    <ListItemText
                      primary="Total MF Profit"
                      secondary={isbn.mfProfit ? isbn.mfProfit : null}
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
