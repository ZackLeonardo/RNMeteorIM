/**
 * React Native IM App with DDP(Meteor)
 * the Component which show Actions area
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

class Actions extends Component{
  constructor(props) {
    super(props);
    this.onActionsPress = this.onActionsPress.bind(this);
  }

  onActionsPress() {
    const options = Object.keys(this.props.options);
    const cancelButtonIndex = Object.keys(this.props.options).length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      tintColor: this.props.optionTintColor
    },
    (buttonIndex) => {
      let i = 0;
      for (let key in this.props.options) {
        if (this.props.options.hasOwnProperty(key)) {
          if (buttonIndex === i) {
            this.props.options[key](this.props);
            return;
          }
          i++;
        }
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.containerStyle, this.props.containerStyle]}
        onPress={this.props.onPressActionButton || this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    );
  }

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapperStyle: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconTextStyle: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

Actions.contextTypes = {
  actionSheet: PropTypes.func,
};

Actions.defaultProps = {
  onSend: () => {},
  options: {},
  optionTintColor: '#007AFF',
  icon: null,
  containerStyle: {},
  iconTextStyle: {},
};

Actions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  optionTintColor: PropTypes.string,
  icon: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};

module.exports = Actions;
