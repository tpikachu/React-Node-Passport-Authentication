import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Search from "@material-ui/icons/Search";

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import * as actions from '../../actions';
import {connect} from 'react-redux';

class HeaderLinks extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      anchorEl: null,
    }
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    this.setState({ anchorEl: null });
  }
  handleLogout = () => {
    this.props.signUserOut();
    this.setState({ anchorEl: null });
    window.location.href='/';
  }
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Person"
          className={classes.buttonLink}
          onClick={this.handleClick}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleProfile}><a href='/user'>Profile</a></MenuItem>
          <MenuItem onClick={this.handleLogout}><a href='/signin'>Logout</a></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(null, actions)(withStyles(headerLinksStyle)(HeaderLinks));
