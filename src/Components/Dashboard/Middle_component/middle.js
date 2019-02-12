import React, { Component } from "react";
import "./middle.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 450,
    margin: "auto",
    marginTop: 20
  },
  list: {
    display: "flex",
    justifyContent: "center"
  },
  divs: {
    marginRight: 80
  },
  inputs: {
    display: "flex"
  },
  input: {
    margin: 10
  },
  [theme.breakpoints.down("sm")]: {
    list: {
      display: "flex",
      flexDirection: "column"
    }
  }
});

class Middle extends Component {
  constructor() {
    super();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.inputs}>
          <Input
            placeholder="Input Price"
            className={classes.input}
            inputProps={{
              "aria-label": "Description"
            }}
          />
          <Input
            placeholder="Cost of Good"
            className={classes.input}
            inputProps={{
              "aria-label": "Description"
            }}
          />
          <Button variant="outlined" className={classes.button}>
            GO
          </Button>
        </div>
        <List className={classes.list}>
          <div className={classes.divs}>
            <ListItem>
              <ListItemText
                primary="Title"
                secondary="Heat and Mass Transfer"
              />
            </ListItem>
            <li>
              <Divider variant="Title" />
            </li>
            <ListItem>
              <ListItemText primary="Image" secondary="Image Goes Here" />
            </ListItem>
            <Divider variant="Title" component="li" />

            <ListItem>
              <ListItemText primary="Binding" secondary="Hardcover" />
            </ListItem>
            <Divider variant="Title" component="li" />
          </div>
          <div className={classes.divs}>
            <ListItem>
              <ListItemText primary="Used BuyBox Price" secondary="$50.60" />
            </ListItem>
            <Divider variant="Title" component="li" />
            <ListItem>
              <ListItemText primary="Sales Rank" secondary="350,000" />
            </ListItem>
            <Divider variant="Title" component="li" />
          </div>

          <div className={classes.divs}>
            <ListItem>
              <ListItemText primary="Total FBA Fees" secondary="$20" />
            </ListItem>
            <Divider variant="Title" component="li" />
            <ListItem>
              <ListItemText primary="Profit FBA" secondary="$129" />
            </ListItem>
            <Divider variant="Title" component="li" />
            <ListItem>
              <ListItemText primary="Total MF Fees" secondary="15" />
            </ListItem>
            <Divider variant="Title" component="li" />
            <ListItem>
              <ListItemText primary="Total MF Profit" secondary="$134" />
            </ListItem>
            <Divider variant="Title" component="li" />
          </div>
        </List>
      </div>
    );
  }
}

Middle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Middle);
