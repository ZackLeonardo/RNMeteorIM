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
import { connect } from 'react-redux';
import { addMessage, deleteMessage } from '../actions/messages';

import Day from '../components/Day';
import Avatar from '../components/Avatar';
import Time from '../components/Time';
import MessageText from '../components/MessageText';
import MessageImage from '../components/MessageImage';
import Bubble from '../components/Bubble';
import Message from '../components/Message';
import Meteor, { createContainer } from 'react-native-meteor';
import MessagesList from '../components/MessagesList';

import * as actions from '../actions/messages';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import messages from '../reducers/messages';

const store = createStore(messages);

const App = () => {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}



class MessagesListContainer extends Component {

  render(){
    const { dispatch, messages, users, myId, addMessage } = this.props;
    return (
      <View style={styles.thisView}>
      <TouchableOpacity
        style={styles.thisView}
        onPress={() => addMessage({'2' : {id: '2', text: 'IndiaRRR', userId: '1', createdAt: '1995-12-25 10:02:00',sent: true}})}
        accessibilityTraits = "text">
        <Text> push me </Text>
      </TouchableOpacity>
        <MessagesList
          messages={messages}
          users = {users}
          myId = {myId}
        />

      </View>
    );
  }

}

const styles = {
  left: StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 10,
      flex: 1
    },
    textStyle: {
      color: 'red',
    }
  }),
  right: StyleSheet.create({
    container: {
      marginTop: 20,
      marginBottom: 10,
      flex: 1
    },
    textStyle: {
      color: 'red',
    }
  }),
  thisView: {
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
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
