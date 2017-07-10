/**
 * React Native IM App with DDP(Meteor)
 * the Component which show time in every message
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text
} from 'react-native';
import PropTypes from 'prop-types';

import moment from 'moment/min/moment-with-locales.min';

import { getLocale } from '../constants/utils';

class Time extends Component{
  render(){
    return(
      <View
        style = {[
          styles[this.props.position].containerStyle,
          this.props.containerStyle[this.props.position]
        ]}>
        <Text
          style = {[
            styles[this.props.position].textStyle,
            this.props.textStyle[this.props.position]
          ]}>
          {moment(this.props.currentMessage.createdAt).locale(getLocale()).format('LT')}
        </Text>
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    containerStyle: {
      ...containerStyle,
    },
    textStyle: {
      color: '#000',
      ...textStyle,
    },
  }),
  right: StyleSheet.create({
    containerStyle: {
      ...containerStyle,
    },
    textStyle: {
      color: '#000',
      ...textStyle,
    },
  }),
};

Time.defaultProps = {
  position: 'left',
  containerStyle: {},
  textStyle: {},
  currentMessage: {
    createdAt: null,
  },
};

Time.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  textStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  currentMessage: PropTypes.object,
};

const containerStyle = {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 5,
};

const textStyle = {
  fontSize: 10,
  backgroundColor: 'transparent',
  textAlign: 'right',
};

module.exports = Time;
