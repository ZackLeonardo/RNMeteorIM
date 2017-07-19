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

import Day from '../components/Day';
import Avatar from '../components/Avatar';
import Time from '../components/Time';
import MessageText from '../components/MessageText';
import MessageImage from '../components/MessageImage';
import Bubble from '../components/Bubble';
import Message from '../components/Message';
import Meteor, { createContainer } from 'react-native-meteor';
import MessageList from '../components/MessageList';


export default class App extends Component {
  constructor(props) {
   super(props);
   this.state = {
      messages: [
        {text: 'China', userId: '1', createdAt: '1995-12-25 10:00:00',
          sent: true,},
        {text: 'India', userId: '2', createdAt: '1995-12-25 10:02:00',sent: true,},
        {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:06:00'},
        {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:10:00'},
        {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:12:00'},
        {text: 'China', userId: '1', createdAt: '1995-12-25 10:16:00'},
        {text: 'India', userId: '2', createdAt: '1995-12-25 10:20:00'},
        {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:30:00'},
        {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:33:00'},
        {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:35:00'},
        {text: 'China', userId: '1', createdAt: '1995-12-25 10:38:00'},
        {text: 'India', userId: '2', createdAt: '1995-12-25 10:38:00'},
        {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:40:00'},
        {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:50:00'},
        {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:59:00'}

      ],
      user: {
        id: '1',
        avatar: 'https://facebook.github.io/react/img/logo_og.png'
      }
   };
  }

  render(){
    return (
      <View style={styles.thisView}>
        <MessageList
          messages={this.state.messages}
          user = {this.state.user}
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
};
