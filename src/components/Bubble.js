/**
 * React Native IM App with DDP(Meteor)
 * the Component which show user talking messages
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';

import { isSameRoom, isSameDay, warnDeprecated} from '../constants/utils';

class Bubble extends Component{
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  render(){
    if (this.props.position === 'left'){
      return (
        <View style={[styles[this.props.position].containerStyle, this.props.containerStyle[this.props.position]]}>
          {this.renderTriangle()}
          {this.renderBubble()}
        </View>
      );
    }else {
      return (
        <View style={[styles[this.props.position].containerStyle, this.props.containerStyle[this.props.position]]}>
          {this.renderBubble()}
          {this.renderTriangle()}
        </View>
      );
    }
  }

  onLongPress() {
  }

  renderTriangle() {
    var bkcolor = StyleSheet.flatten(styles[this.props.position].wrapperStyle).backgroundColor;
    return (
      <View style={[styles[this.props.position].triangleStyle, {borderBottomColor:bkcolor}]}/>
    );
  }

  renderBubble() {
    return (
      <View style={[styles[this.props.position].wrapperStyle, this.props.wrapperStyle[this.props.position]]}>
        <TouchableWithoutFeedback
        onLongPress={this.onLongPress}
        accessibilityTraits="text"
        {...this.props.touchableProps}>
          <View>
          {this.renderCustomView()}
          {this.renderMessageImage()}
          {this.renderMessageText()}
            <View style={[styles.bottomContainerStyle, this.props.bottomContainerStyle[this.props.position]]}>
              {this.renderTime()}
              {this.renderStatus()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderCustomView() {
    if (this.props.renderCustomView) {
      return this.props.renderCustomView(this.props);
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const {containerStyle, wrapperStyle, ...messageImageProps} = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps}/>;
    }
    return null;
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const {containerStyle, wrapperStyle, ...messageTextProps} = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }

      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const {containerStyle, wrapperStyle, ...timeProps} = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return <Time {...timeProps}/>;
    }
    return null;
  }

  renderStatus() {
    const {currentMessage} = this.props;
    if (this.props.renderStatus) {
        return this.props.renderStatus(currentMessage);
    }

    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={styles.statusViewStyle}>
          {currentMessage.sent && <Text style={[styles.statusStyle, this.props.statusStyle]}>✓</Text>}
          {currentMessage.received && <Text style={[styles.statusStyle, this.props.statusStyle]}>✓</Text>}
        </View>
      )
    }
  }
}

Bubble.defaultProps = {
  position: 'left',
  containerStyle: {},
  wrapperStyle: {},
  touchableProps: {},
  renderCustomView: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  renderMessageImage: null,
  renderMessageText: null,
  bottomContainerStyle: {},
  renderTime: null,
  statusStyle: {},
};

Bubble.propTypes = {
  position: React.PropTypes.oneOf(['left', 'right']),
  containerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  wrapperStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  currentMessage: React.PropTypes.object,
  renderMessageImage: React.PropTypes.func,
  renderMessageText: React.PropTypes.func,
  bottomContainerStyle: React.PropTypes.shape({
    left: View.propTypes.style,
    right: View.propTypes.style,
  }),
  renderTime: React.PropTypes.func,
  touchableProps: React.PropTypes.object,
  renderCustomView: React.PropTypes.func,
  statusStyle: Text.propTypes.style,
};

const styles = {
  left: StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    wrapperStyle: {
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
      marginRight: 60,
      minHeight: 20,
    },
    triangleStyle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 6,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      transform: [
        {rotate: '-90deg'}
      ],
    }

  }),
  right: StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    wrapperStyle: {
      borderRadius: 15,
      backgroundColor: '#0084ff',
      marginLeft: 60,
      minHeight: 20,

    },
    triangleStyle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 6,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      transform: [
        {rotate: '90deg'}
      ],
    }
  }),
  bottomContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  statusViewStyle: {
    flexDirection: 'row',
    marginRight: 10,
  },
  statusStyle: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: 'green',
  },

}

const triangleStyleCom = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 3,
  borderRightWidth: 3,
  borderBottomWidth: 6,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
};


module.exports = Bubble;
