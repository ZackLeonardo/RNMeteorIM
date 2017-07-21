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
      messages: {
        1 :
        {text: 'China', userId: '1', createdAt: '1995-12-25 10:00:00',
          sent: true,},
        2 : {text: 'IndiaRRR', userId: '2', createdAt: '1995-12-25 10:02:00',sent: true,},
        3 : {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:06:00'},
        4 : {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:10:00'},
        5 : {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:12:00'},
        6 : {text: 'China', userId: '1', createdAt: '1995-12-25 10:16:00'},
        7 : {text: 'India', userId: '2', createdAt: '1995-12-25 10:20:00'},
        8 : {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:30:00'},
        9 : {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:33:00'},
        10 : {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:35:00'},
        11 : {text: 'China', userId: '1', createdAt: '1995-12-25 10:38:00'},
        12 : {text: 'India', userId: '2', createdAt: '1995-12-25 10:38:00'},
        13 : {text: 'U.S.A.', userId: '3', createdAt: '1995-12-25 10:40:00'},
        14 : {text: 'Indonesia', userId: '4', createdAt: '1995-12-25 10:50:00'},
        15 : {text: 'Brazil', userId: '5', createdAt: '1995-12-25 10:59:00'}

      },
      users: {
        1: {
          id: '1',
          avatar: 'https://facebook.github.io/react/img/logo_og.png'
        },
        2: {
          id: '2',
          avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
        },
        3: {
          id: '3',
          avatar: 'https://img1.doubanio.com/img/fmadmin/large/873609.jpg'
        },
        4: {
          id: '4',
          avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
        },
        5: {
          id: '5',
          avatar: 'https://img3.doubanio.com/img/fmadmin/large/882261.jpg'
        }
      },

      // users: [
      //   {
      //     id: '1',
      //     avatar: 'https://facebook.github.io/react/img/logo_og.png'
      //   },
      //   {
      //     id: '2',
      //     avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
      //   },
      //   {
      //     id: '3',
      //     avatar: 'https://facebook.github.io/react/img/logo_og.png'
      //   },
      //   {
      //     id: '4',
      //     avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
      //   },
      //   {
      //     id: '5',
      //     avatar: 'https://facebook.github.io/react/img/logo_og.png'
      //   }],
        myId: '1',
      }

  }

  render(){
    return (
      <View style={styles.thisView}>
        <MessageList
          messages={this.state.messages}
          users = {this.state.users}
          myId = {this.state.myId}
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
