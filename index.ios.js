/**
 * React Native IM App with DDP(Meteor)
 *
 * @zack
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import App from './src/containers/app';

export default class RNMeteorIM extends Component {
    render() {
        return (
            <App />
        );
    }
};

AppRegistry.registerComponent('RNMeteorIM', () => RNMeteorIM);
