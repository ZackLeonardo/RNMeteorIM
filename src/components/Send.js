/**
 * React Native IM App with DDP(Meteor)
 * the Component which show Send area
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

class Send extends Component{
  render() {
    if (this.props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={[styles.containerStyle, this.props.containerStyle]}
          onPress={() => {
            this.props.onSend({text: this.props.text.trim()}, true);
          }}
          accessibilityTraits='button'
        >
          <Text style={[styles.textStyle, this.props.textStyle]}>{this.props.label}</Text>
        </TouchableOpacity>
      );
    }
    return <View/>;
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: 61,
    height: 44,
    justifyContent: 'flex-end',
  },
  textStyle: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 17,
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});

Send.defaultProps = {
  text: '',
  onSend: () => {},
  label: 'Send',
  containerStyle: {},
  textStyle: {},
};

Send.propTypes = {
  text: PropTypes.string,
  onSend: PropTypes.func,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};

module.exports = Send;
