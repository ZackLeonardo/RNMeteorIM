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

export default class App extends Component {
    render() {
        return (
            <View style={ styles.container}>
              <Day />
              <Avatar  />
            </View>
        );
    }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    flex: 1
  }
})
