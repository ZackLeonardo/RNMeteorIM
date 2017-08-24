/**
 * React Native IM App with DDP(Meteor)
 * the Component which show user talking message contains avatar and bubble...
 * u can set showDate to let the day show or hide
 * @zack
 */

 import React, { Component } from 'react';
 import {
   View,
   ViewPropTypes,
   StyleSheet,
 } from 'react-native';
 import PropTypes from 'prop-types';

 import Day from './Day';
 import Avatar from './Avatar';
 import Bubble from './Bubble';

 import {isSameRoom, isSameDay} from '../constants/utils';

 class Message extends Component{
   render(){
     return (
       <View>
        {this.renderDay()}
        <View style={[styles[this.props.position].containerStyle, this.props.containerStyle[this.props.position]]}>
          {this.props.position === 'left' ? this.renderAvatar() : null}
          {this.renderBubble()}
          {this.props.position === 'right' ? this.renderAvatar() : null}
        </View>
       </View>
     );
   }

   renderDay(){
     if (this.props.currentMessage.createdAt && this.props.showDate === true){
       const dayProps = this.getInnerComponentProps();
       if (this.props.renderDay) {
         return this.props.renderDay(dayProps);
       }
       return <Day {...dayProps}/>;
     }
     return null;
   }

   renderAvatar() {
     if (this.props.user.avatar) {
       const avatarProps = this.getInnerComponentProps();
       if (this.props.renderAvatar) {
         return this.props.renderAvatar(avatarProps);
       }
       return <Avatar {...avatarProps}/>;
     }
     return null;
   }

   renderBubble() {
     const bubbleProps = this.getInnerComponentProps();
     if (this.props.renderBubble) {
       return this.props.renderBubble(bubbleProps);
     }
     return <Bubble {...bubbleProps}/>;
   }

   getInnerComponentProps() {
     const {containerStyle, ...props} = this.props;
     return {
       ...props,
       isSameRoom,
       isSameDay
     }
   }
 }

 const styles = {
   left: StyleSheet.create({
     containerStyle: {
       flexDirection: 'row',
       justifyContent: 'flex-start',
       marginLeft: 8,
       marginRight: 0,
     },
   }),
   right: StyleSheet.create({
     containerStyle: {
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginLeft: 0,
       marginRight: 8,
     },

   }),
 };

 Message.defaultProps = {
   currentMessage: {},
   user: {},
   position: 'left',
   containerStyle: {},
   showDate: true,
   renderStatusView: null,
 };

 Message.propTypes = {
   currentMessage: PropTypes.object,
   user: PropTypes.object,
   position: PropTypes.oneOf(['left', 'right']),
   containerStyle: PropTypes.shape({
     left: ViewPropTypes.style,
     right: ViewPropTypes.style,
   }),
   showDate: PropTypes.bool,
   renderStatusView: PropTypes.func,
 };

 module.exports = Message;
