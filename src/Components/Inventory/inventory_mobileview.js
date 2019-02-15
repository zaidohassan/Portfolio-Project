import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import axios from "axios";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  typography: {
    textAlign: "left",
    paddingLeft: 15
  },
  button: {
    marginLeft: 10
  }
});

class Mobile extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = id => {
    axios.delete(`/api/deleteInventory/${id}`).then(response => {
      this.handleClose();
      this.props.getInventory();
    });
  };

  render() {
    const { classes, display } = this.props;
    return (
      <div className={classes.root}>
        {display.map(book => (
          <ExpansionPanel key={book.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>{book.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <p>
                <strong> Sales Rank: </strong> <br />
                {book.salesrank}
              </p>
              <p className={classes.typography}>
                <strong> Buy Box Price: </strong> <br />${book.buyboxprice}
              </p>
              <p className={classes.typography}>
                <strong> COGs: </strong> <br /> <br /> ${book.costofgood}
              </p>
              <p className={classes.typography}>
                <strong>FBA Profit: </strong> <br /> ${book.fbaprofit}
              </p>
              <p className={classes.typography}>
                <strong> MF Profit:</strong> <br />${book.mfprofit}
              </p>
              <IconButton className={classes.button} aria-label="Delete">
                <DeleteIcon onClick={this.handleClickOpen} />

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete from your Inventory?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={() => this.handleDelete(book.id)}
                      color="primary"
                      autoFocus
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </IconButton>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}

Mobile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Mobile);
