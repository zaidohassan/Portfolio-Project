import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import classnames from "classnames";
import Card from "@material-ui/core/Card";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)",
    marginTop: 200
  },
  width: {
    width: 400,
    marginTop: 50
  }
});

class Reviews extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1>Testimonials </h1>
        <div className={classes.root}>
          <Chip
            avatar={<Avatar>MB</Avatar>}
            label={
              <div>
                ClickAble Link
                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Collapse
                  in={this.state.expanded}
                  timeout="auto"
                  unmountOnExit
                  className={classes.width}
                >
                  <Card>
                    <CardContent>
                      <Typography paragraph>Method:</Typography>
                      <Typography paragraph>
                        Heat 1/2 cup of the broth in a pot until simmering, add
                        saffron and set aside for 10 minutes.
                      </Typography>
                      <Typography paragraph>
                        Heat oil in a (14- to 16-inch) paella pan or a large,
                        deep skillet over medium-high heat. Add chicken, shrimp
                        and chorizo, and cook, stirring occasionally until
                        lightly browned, 6 to 8 minutes. Transfer shrimp to a
                        large plate and set aside, leaving chicken and chorizo
                        in the pan. Add pimentón, bay leaves, garlic, tomatoes,
                        onion, salt and pepper, and cook, stirring often until
                        thickened and fragrant, about 10 minutes. Add saffron
                        broth and remaining 4 1/2 cups chicken broth; bring to a
                        boil.
                      </Typography>
                      <Typography paragraph>
                        Add rice and stir very gently to distribute. Top with
                        artichokes and peppers, and cook without stirring, until
                        most of the liquid is absorbed, 15 to 18 minutes. Reduce
                        heat to medium-low, add reserved shrimp and mussels,
                        tucking them down into the rice, and cook again without
                        stirring, until mussels have opened and rice is just
                        tender, 5 to 7 minutes more. (Discard any mussels that
                        don’t open.)
                      </Typography>
                      <Typography>
                        Set aside off of the heat to let rest for 10 minutes,
                        and then serve.
                      </Typography>
                    </CardContent>
                  </Card>
                </Collapse>
              </div>
            }
            className={classes.chip}
            Hello
          />
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Reviews);
