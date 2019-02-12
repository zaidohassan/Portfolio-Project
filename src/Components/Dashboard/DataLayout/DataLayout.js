import React, { Component } from "react";
import "./DataLayout.css";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import "date-fns";
// import CardMedia from "@material-ui/core/CardMedia";

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
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
});

class DataLayout extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: new Date()
    };
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;
    const {
      title,
      binding,
      salesRank,
      usedBuyBoxPrice,
      imageURL
    } = this.props.data;

    return (
      <div className={classes.root}>
        <div className={classes.inputs}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
          <Input placeholder="Input Price" className={classes.input} />
          <Input placeholder="Cost of Good" className={classes.input} />
          <Button variant="outlined" className={classes.button}>
            GO
          </Button>
        </div>
        <List className={classes.list}>
          <div className={classes.divs}>
            <ListItem>
              <ListItemText
                primary="Title"
                secondary={title ? title : "Title"}
              />
            </ListItem>

            <Divider variant="Title" />

            <ListItem>
              {" "}
              <ListItemText
                primary="Image"
                secondary={
                  imageURL ? <img src={imageURL} alt="Book Cover" /> : "Image"
                }
                className={classes.listitemtext}
              />
              {/* <CardMedia
                className={classes.media}
                image={imageURL}
                title="Paella dish"
              /> */}
            </ListItem>
            <Divider
              variant="Title"
              component="li"
              className={classes.dividers}
            />

            <ListItem>
              <ListItemText
                primary="Binding"
                secondary={binding ? binding : "Binding"}
              />
            </ListItem>
            <Divider variant="Title" component="li" />
          </div>
          <div className={classes.divs}>
            <ListItem>
              <ListItemText
                primary="Used BuyBox Price"
                secondary={
                  usedBuyBoxPrice ? usedBuyBoxPrice : "Competitive BuyBox Price"
                }
              />
            </ListItem>
            <Divider variant="Title" component="li" />
            <ListItem>
              <ListItemText
                primary="Sales Rank"
                secondary={salesRank ? salesRank : "Sales Rank"}
              />
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

DataLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DataLayout);
