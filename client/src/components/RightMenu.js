import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  link: {
    outline: 'none',
    textDecoration: 'none'
  },
  menuButton: {
    color: '#fff',
    fontSize: '18px',
    marginRight: '-15px',
    textTransform: 'none'
  }
};

class NavbarRightMenu extends Component {
  state = {
    // anchorEl: null
  };

  handleClick = (event) => {
    this.setState();
  };

  handleClose = () => {
    this.setState();
  };

  render() {
    // const { classes, logoutUser, user } = this.props;
    // const { anchorEl } = this.state;

    return (
      <div>
        <Button
        //   aria-owns={anchorEl ? 'right-menu' : null}
          aria-haspopup="true"
         
          onClick={this.handleClick}
        >
         you are hero
        </Button>
        <Menu
          id="right-menu"
        //   anchorEl={anchorEl}
        //   open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to={`/profile/`}>
            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
          </Link>
          <Link to="/discover">
            <MenuItem onClick={this.handleClose}>Discover</MenuItem>
          </Link>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

NavbarRightMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(NavbarRightMenu);
