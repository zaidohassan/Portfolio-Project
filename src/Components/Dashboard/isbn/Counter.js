import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import sum from "../../../sum.svg";
import acceptedIcon from "../../../acceptedIcon.svg";
import percentage from "../../../percentage.svg";
import "./Counter.css";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  root: {
    width: 220,
    marginLeft: 20,
    borderRadius: 15,
    border: "1.5px solid #e82c0c"
  },
  [theme.breakpoints.down("650")]: {
    root: {
      backgroundColor: "transparent",
      border: "none"
    },
    BottomNav: {
      marginTop: 10,
      width: 270,
      margin: "auto"
    }
  },
  ["@media (min-width: 650px) and (max-width: 969px)"]: {
    BottomNav: {
      position: "absolute",
      top: 770
    }
  },
  ["@media (min-width: 970px) and (max-width: 1200px)"]: {
    BottomNav: {
      position: "absolute",
      top: 475,
      left: 740,
      display: "flex",
      flexDirection: "column",
      transform: "rotate(90deg)"
    },
    entireIconLabel: {
      transform: "rotate(270deg)"
    },
    root: {
      marginLeft: 0,
      display: "flex",
      height: 100,
      width: 300
    }
  }
});

class Counter extends React.Component {
  render() {
    const {
      totalCount,
      acceptCount,
      percentageCount,
      disabled
    } = this.props.bookCount;
    const { classes } = this.props;
    return (
      <div className={classes.BottomNav}>
        <BottomNavigation showLabels className={classes.root}>
          <BottomNavigationAction
            className={classes.entireIconLabel}
            label={
              <div className={disabled ? null : "animated fadeInUp"} id="label">
                {acceptCount}
              </div>
            }
            icon={
              <Tooltip
                disableFocusListener
                disableTouchListener
                placement="top-left"
                title="# of Accepted Books Today"
              >
                <img id="sumimage" src={acceptedIcon} alt="acceptedIcon" />
              </Tooltip>
            }
          />

          <BottomNavigationAction
            className={classes.entireIconLabel}
            label={
              <div className={disabled ? null : "animated fadeInUp"} id="label">
                {totalCount}
              </div>
            }
            icon={
              <Tooltip
                disableFocusListener
                disableTouchListener
                placement="top"
                title="Total Books Scanned Today"
              >
                <img id="sumimage" src={sum} alt="sum" />
              </Tooltip>
            }
          />
          <BottomNavigationAction
            className={classes.entireIconLabel}
            label={
              <div className={disabled ? null : "animated fadeInUp"} id="label">
                {percentageCount + "%"}
              </div>
            }
            icon={
              <Tooltip
                disableFocusListener
                disableTouchListener
                placement="top-start"
                title="Acceptance Rate"
              >
                <img id="sumimage" src={percentage} alt="acceptedIcon" />
              </Tooltip>
            }
          />
        </BottomNavigation>
      </div>
    );
  }
}

Counter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Counter);
