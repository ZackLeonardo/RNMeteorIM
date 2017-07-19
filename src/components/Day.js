/**
 * React Native IM App with DDP(Meteor)
 * the Component which show day info abow the talk
 * u can set showDateType & props.showDate to show only day or day-time or nothing
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  NativeModules
} from 'react-native';
import PropTypes from 'prop-types';

import moment from 'moment/min/moment-with-locales.min';

import { isSameDay, isSameRoom, warnDeprecated, getLocale } from '../constants/utils';

class Day extends Component {
  render() {
    if (!isSameDay(this.props.currentMessage, this.props.previousMessage)){
      return (
        <View style = {[ styles.container, this.props.containerStyle]}>
          <Text style = {[ styles.text, this.props.textStyle]}>
            {this.dateShow()}
          </Text>
        </View>
      );
    }
    return null;
  }

  dateShow(){
    if (this.props.showDateType === 'showTimeInDay') {
      return moment.utc(this.props.currentMessage.createdAt).locale(getLocale()).format('LLL').toUpperCase();
    }
    if (this.props.showDateType === 'showDay') {
      return moment().utc(this.props.currentMessage.createdAt).locale(getLocale()).format('LL').toUpperCase();
    }
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#b2b2b2',
    fontSize: 12,
    fontWeight: '600',
  },

});

Day.defaultProps = {
  currentMessage: {
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  textStyle: {},
  isSameDay: warnDeprecated(isSameDay),
  isSameRoom: warnDeprecated(isSameRoom),
  showDateType: 'showTimeInDay',
};

Day.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  isSameDay: PropTypes.func,
  isSameRoom: PropTypes.func,
  showDateType: PropTypes.oneOf(['showDay', 'showTimeInDay']),
};

module.exports = Day;
