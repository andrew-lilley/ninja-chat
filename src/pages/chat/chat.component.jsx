import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOutStart } from '../../redux/user/user.actions';

export const ChatPage = ({ signOutStart }) => {
  return (
    <div>
      <h1>Chat App - Under Construction</h1>
      <p>In the meantime you can <Link to="/login" onClick={signOutStart}>sign out</Link></p>
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(null, mapDispatchToProps)(ChatPage);