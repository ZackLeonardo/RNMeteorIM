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
import MessagesList from '../components/MessagesFlatList';

import { connect } from 'react-redux';
import * as actions from '../actions/messages';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import messages from '../reducers/messages';
import rootSaga from '../sagas/messages';
import ChatContainer from './ChatContainer';

import Meteor, { createContainer } from 'react-native-meteor';

Meteor.connect('ws://localhost:3000/websocket');

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  messages,
  applyMiddleware(sagaMiddleware)
)

// const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
//
// const store = createStoreWithMiddleware(messages)

const App = () => (
  <Provider store={store}>
    <MyApp />
  </Provider>
)

sagaMiddleware.run(rootSaga)

const MyApp = connect(
  state => ({
    messages: state.messages,
    users: state.users,
    myId: state.myId,
    roomId: state.roomId,
    // state
  }),
  actions
  // dispatch => ({
  //   addMessageAsync: message => dispatch(actions.addMessage(message)),
  //
  // })
)(ChatContainer)

module.exports = App;
