import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavbarContainer from '../parts/NavBar';
import CreatePost from '../parts/CreatePost';
import Post from '../parts/Post';


export class HomePage extends Component {
  constructor(props){
    super(props)
    this.state={
      user : props.user
    }
  }
  componentDidMount = () => {
    // const { history } = this.props;
    // if (!localStorage.jwtToken) {
    //   history.push('/login');
    // }
    console.log("55555555555555555555555555555555555555555555555");

    console.log(this.state.user);

  };


  render() {
    return (
      <div>
        <div>  <h1>{this.props.user.name}</h1></div>
        <NavbarContainer />
        <CreatePost />
        <Post/>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   auth: state.authReducer
// });

export default HomePage;
