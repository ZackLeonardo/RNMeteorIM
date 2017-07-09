/**
 * React Native IM App with DDP(Meteor)
 * the Component which show text style message
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ActionSheetIOS
} from 'react-native';

import ParsedText from 'react-native-parsed-text';

import Communications from '../constants/communications'

class MessageText extends Component{
  constructor(props) {
    super(props);
    this.handlePhonePress = this.handlePhonePress.bind(this);
    this.handleEmailPress = this.handleEmailPress.bind(this);
  }

  render() {
    return (
      <View style = {[
        styles[this.props.position].containerStyle,
        this.props.containerStyle[this.props.position]
      ]}>
        <ParsedText
          style = {[
            styles[this.props.position].textStyle,
            this.props.textStyle[this.props.position]
          ]}
          parse = {[
            {
              type: 'url',
              style: StyleSheet.flatten([styles[this.props.position].linkStyle, this.props.linkStyle[this.props.position]]),
              onPress: Communications.web
            },
            {
              type: 'phone',
              style: StyleSheet.flatten([styles[this.props.position].phoneStyle, this.props.phoneStyle[this.props.position]]),
              onPress: this.handlePhonePress
            },
            {
              type: 'email',
              style: StyleSheet.flatten([styles[this.props.position].linkStyle, this.props.linkStyle[this.props.position]]),
              onPress: this.handleEmailPress
            },

          ]}
        >
          {this.props.currentMessage.text}
        </ParsedText>
      </View>
    );
  }

  handlePhonePress(phone) {
    const options = [
      'Text',
      'Call',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Communications.text(phone);
          break;
        case 1:
          Communications.phonecall(phone, true);
          break;
      }
    });
  }

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

}

MessageText.contextTypes = {
  actionSheet: React.PropTypes.func,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: '',
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {},
  phoneStyle: {}
};

MessageText.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  currentMessage: React.PropTypes.object,
  containerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  textStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  linkStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  phoneStyle: React.PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  })
};


const styles = {
  left: StyleSheet.create({
    containerStyle: {
      paddingTop: 3,
      borderRadius: 13,
    },
    textStyle: {
      margin: 3,
      color: 'black',
      ...textStyleCom,
    },
    linkStyle: {
      color: 'royalblue',
      textDecorationLine: 'underline',
    },
    phoneStyle: {
      color: 'royalblue',
    }
  }),
  right: StyleSheet.create({
    containerStyle: {
      borderRadius: 13,
    },
    textStyle: {
      color: 'black',
      ...textStyleCom,
    },
    linkStyle: {
      color: 'royalblue',
      textDecorationLine: 'underline',
    },
    phoneStyle: {
      color: 'royalblue',
    }
  }),
}

const textStyleCom = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

module.exports = MessageText;
