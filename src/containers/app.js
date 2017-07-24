/**
 * React Native IM App with DDP(Meteor)
 * the main app page
 *
 * @zack
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';


// import Day from '../components/Day';
// import Avatar from '../components/Avatar';
// import Time from '../components/Time';
// import MessageText from '../components/MessageText';
// import MessageImage from '../components/MessageImage';
// import Bubble from '../components/Bubble';
// import Message from '../components/Message';
// import Meteor, { createContainer } from 'react-native-meteor';
import MessagesList from '../components/MessagesList';

import { connect } from 'react-redux';
import * as actions from '../actions/messages';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import messages from '../reducers/messages';
import MessagesListContainer from './MessagesListContainer';

const store = createStore(messages);

const App = () => {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

const MyApp = connect(
  state => ({
    messages: state.messages,
    users: state.users,
    myId: state.myId,
    // state
  }),
  dispatch => ({
    addMessage: message => dispatch(actions.addMessage(message)),

  })
)(MessagesListContainer)

module.exports = App;
