import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
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
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    maxWidth: 1400,
    margin: "0 auto",
    border: "1px solid black"
  },
  table: {
    minWidth: 1000
  },
  tablecells: {
    borderLeft: "1px solid black",
    textAlign: "center"
  },
  tablecellsright: {
    borderRight: "1px solid black",
    borderLeft: "1px solid black",
    textAlign: "center"
  },
  tableheaders: {
    textAlign: "center",
    width: 50
  },
  button: {
    color: "#ff5722"
  },
  tablecellbutton: {
    textAlign: "center"
  }
});

class Desktop extends Component {
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
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableheaders}>Title</TableCell>
              <TableCell className={classes.tableheaders} align="right">
                Sales Rank
              </TableCell>
              <TableCell className={classes.tableheaders} align="center">
                Buy Box Price
              </TableCell>
              <TableCell className={classes.tableheaders} align="right">
                Cost of Good
              </TableCell>
              <TableCell className={classes.tableheaders} align="right">
                FBA Profit
              </TableCell>
              <TableCell className={classes.tableheaders} align="right">
                MF Profit
              </TableCell>
              <TableCell className={classes.tableheaders} align="right">
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {display.map(book => (
              <TableRow key={book.id}>
                <TableCell component="th" scope="row">
                  {book.title}
                </TableCell>
                <TableCell align="right">{book.salesrank}</TableCell>
                <TableCell className={classes.tablecells} align="right">
                  ${book.buyboxprice}
                </TableCell>
                <TableCell className={classes.tablecells} align="right">
                  ${book.costofgood}
                </TableCell>
                <TableCell className={classes.tablecells} align="right">
                  ${book.fbaprofit}
                </TableCell>
                <TableCell className={classes.tablecellsright} align="right">
                  ${book.mfprofit}
                </TableCell>
                <TableCell className={classes.tablecellbutton} align="right">
                  <IconButton className={classes.button} aria-label="Delete">
                    <div>
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
                            onClick={this.handleClose}
                            color="primary"
                            autoFocus
                            onClick={() => this.handleDelete(book.id)}
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

Desktop.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Desktop);
