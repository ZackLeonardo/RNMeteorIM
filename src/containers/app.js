/**
 * React Native IM App with DDP(Meteor)
 * the main app page
 *
 * @zack
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import Day from '../components/Day';
import Avatar from '../components/Avatar';
import Time from '../components/Time';
import MessageText from '../components/MessageText';
import MessageImage from '../components/MessageImage';
import Bubble from '../components/Bubble';
import Message from '../components/Message';

export default class App extends Component {
    render() {
        return (
          <View style={ styles.container}>
            <Message
              currentMessage={{
                createdAt: 1360013296123,
                text: 'this is a test text'

              }}
              user = {{
                avatar: 'https://facebook.github.io/react/img/logo_og.png',
              }}
              position='right'/>

          </View>

        );
    }
};

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
  }
};

/*
<Day />
<Avatar  />
<Time
  position={'left'}
  currentMessage={{createdAt: 1360013296123}}
/>
<Time
  position={'right'}
  currentMessage={{createdAt: 1360013296123}}
  textStyle = {{'right': styles['right'].textStyle}}
/>
<MessageText
  currentMessage={{
  text: 'test : http://baidu.com 15810536985   wolf_dream@163.com'
  }}
/>
<MessageImage
  currentMessage={{
  image: 'https://facebook.github.io/react/img/logo_og.png'
  }}
/>
<View style = {styles.thisView}>
  <Bubble
  currentMessage={{
  image: 'https://facebook.github.io/react/img/logo_og.png',
  createdAt: '2017/07/07 12:12:12',
  sent: true,
}}
  position = 'left'/>
</View>
<View style = {styles.thisView}>
  <Bubble
  currentMessage={{
  text: 'https://facebook.github.io/react/img/logo_og.png',
  createdAt: '2017/07/07 12:12:12',
  sent: true,
}}
  position = 'left'/>
</View>
<View style = {styles.thisView}>
  <Bubble
  currentMessage={{
  image: 'https://facebook.github.io/react/img/logo_og.png',
  createdAt: '2017/07/07 12:12:12',
  sent: true,
}}
  position = 'right'/>
</View>
<View style = {styles.thisView}>
  <Bubble
  currentMessage={{
  text: 'https://facebook.github.io/react/img/logo_og.png',
  createdAt: '2017/07/07 12:12:12',
  sent: true,
}}
  position = 'right'/>
</View>
*/
