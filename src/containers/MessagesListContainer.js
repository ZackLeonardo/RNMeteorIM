/**
 * React Native IM App with DDP(Meteor)
 * the container which show messages in ListView
 *
 * @zack
 */
import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import MessagesList from '../components/MessagesList';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as actions from '../actions/messages';
import messages from '../reducers/messages';

class MessagesListContainer extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {  messages, users, myId, addMessage } = this.props;
    return (
      <View >
      <TouchableOpacity
        style={styles.thisView}
        onPress={() => addMessage()}
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
  thisView: {
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#c5c5c5',
  },
}

module.exports = MessagesListContainer;
