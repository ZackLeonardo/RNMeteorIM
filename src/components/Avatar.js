/**
 * React Native IM App with DDP(Meteor)
 * the Component which show avatar before every message
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

class Avatar extends Component{
  render(){
    //头像、名称都没有，则显示默认
    if (!this.props.user.avatar && !this.props.user.name){
      return (
        <View
          style={[
            styles.avatarStyle,
            {backgroundColor: 'transparent'},
            this.props.avatarStyle
          ]}
          accessibilityTraits = "image"
        />
      );
    }
    //有头像，则显示头像，根据props设置决定点击事件以及是否显示名字（名字不能长于头像宽度，长于后截取）
    if (this.props.user.avatar){
      return(
        <TouchableOpacity
          style={styles.containerStyle}
          disabled={this.props.onPress ? false : true}
          onPress={this.props.onPress}
          accessibilityTraits = "image">
          <Image
            style={[styles.avatarStyle,  this.props.avatarStyle]}
            source={{uri: this.props.user.avatar}}
          />
          {this.renderAvatarName()}
        </TouchableOpacity>
      );
    }
  }

  renderAvatarName(){
    if (this.props.showName == true){
      var showThisName = this.props.user.name;
      if (showThisName.length > 5){
        showThisName = showThisName.slice(0, 4).concat('...');
      }
      return (
        <Text style={[styles.textStyle, this.props.textStyle]}>
          {showThisName}
        </Text>
      );
    }
    return null;
  }
}


const styles = StyleSheet.create({
  containerStyle:{
    flexDirection: 'column',
  },
  avatarStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  textStyle:{
    color: 'black',
    fontSize: 16,
    backgroundColor: 'transparent',
    fontWeight: '100',
  }

});

Avatar.defaultProps = {
  user: {
    avatar: null,
    name: null,
    // avatar: 'https://facebook.github.io/react/img/logo_og.png',
    // name: 'reactreara',
  },
  avatarStyle: {backgroundColor: '#faebd7'},
  textStyle: null,
  onPress: null,
  showName: false,
};

Avatar.propTypes = {
  user: PropTypes.object,
  avatarStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  onPress: PropTypes.func,
  showName: PropTypes.bool
};

module.exports = Avatar;
