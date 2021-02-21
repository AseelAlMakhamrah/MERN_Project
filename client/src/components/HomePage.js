import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavbarContainer from './NavBar';
import CreatePost from './CreatePost';

export class HomePage extends Component {
//   componentDidMount = () => {
//     const { history } = this.props;
//     if (!localStorage.jwtToken) {
//       history.push('/login');
//     }
//   };

  render() {
    return (
      <div>
        <NavbarContainer />
        <CreatePost />
      </div>
    );
  }
}

// HomePage.propTypes = {
//   history: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.authReducer
// });

export default HomePage;
