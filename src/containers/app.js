/**
 * React Native IM App with DDP(Meteor)
 * the Component connect meteor sub and redux to chatContainer page
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

import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, bindActionCreators } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Meteor, { createContainer, Tracker } from 'react-native-meteor';

import * as MessageActions from '../actions/messages';
import messages from '../reducers/messages';
import rootSaga from '../sagas/messages';
import ChatContainer from './ChatContainer';

Meteor.connect('ws://localhost:3000/websocket');

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  messages,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga);

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <MyApp />
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages,
  users: state.users,
  myId: state.myId,
  roomId: state.roomId,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(MessageActions, dispatch)
});

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage: (message) => {
//       dispatch(addMessage(message))
//     }
//   }
// }

// const mergeProps = (stateProps, dispatchProps, ownProps) => (
//   // Object.assign({}, ownProps, stateProps, dispatchProps)
//   Object.assign({}, ownProps, {
//     messages: stateProps.messages,
//     setMessages: () => dispatchProps.setMessages(ownProps.messages)
//   })
// );

const MyApp = connect(
  mapStateToProps,
  mapDispatchToProps,
  // mergeProps,
)(ChatContainer);

export default createContainer(
  ()=>{
    Meteor.subscribe('messages');

    return store.dispatch({
      type: 'SET_MESSAGES',
      messages: Meteor.collection('messages').find(),
    })
  }, App
);

// meteor subs update redux store之总结：
// 首先要明白先后顺序，先meteor subs，从meteor collection获取数据，再用这些数据更新redux store。
// 其次更新redux store的方式，可以通过触发reducer更新，更直接的方式是store dispatch方式。
