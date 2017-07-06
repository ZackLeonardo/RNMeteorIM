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

export default class App extends Component {
    render() {
        return (
            <View style={ styles.container}>
              <Day />
              <Avatar  />
              <Time
                position={'left'}
                currentMessage={{createdAt: 1360013296123}}
              />
              <Time
                position={'right'}
                currentMessage={{createdAt: 1360013296123}}
              />
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
