/**
 * React Native IM App with DDP(Meteor)
 * the Component which show user talking message in FlatList
 *
 * @zack
 */

 import React, { Component } from 'react';
 import {
   FlatList,
   View,
   ViewPropTypes,
   StyleSheet,
 } from 'react-native';
 import PropTypes from 'prop-types';

 import moment from 'moment/min/moment-with-locales.min';

 import Message from './Message';
 import { isJson, isSameUser, array2MapById, json2Array } from '../constants/utils'

 class MessagesList extends Component {

   constructor(props){
     super(props);

     this._timeShowed = null;
     this._userMapTmp = null;
   }

   componentWillMount(){
     // 判断users的类型，如果是array则转换成map
     this._userMapTmp = this.initUsersInfo(this.props.users);
   }

   componentWillUpdate(){
     this._timeShowed = null; // 组件更新时，重置使得日期显示正常
   }

   componentDidMount(){
     console.log('componentDidMount');
     this.autoScroll();
   }

   componentDidUpdate(){
     console.log('componentDidUpdate');
     this.autoScroll();
   }

   //初始化users信息，统一成Map格式，key为id
   initUsersInfo(users){
     if (isJson(users)) {
       return null;
     } else {
       return array2MapById(users);
     }
   }

  //  scrollToBottom() {
  //   // Settimeout needed here to wait for the page module to be added so scroll works properly
  //     setTimeout(this.flatListRef.scrollToEnd, 10)
  //   }

   autoScroll() {
     console.log('autoScroll');
    if (this.refs.flatListRef) {
      // this.refs.flatListRef.scrollToOffset({animated: true, offset: 44});
      this.refs.flatListRef.scrollToEnd({animated: false});
    }
  }

   scrollTo(options){
     this.refs.flatListRef.scrollTo(options);
   }

   scrollToEnd(options){
     console.log('flatListRef scrollToEnd');
     this.refs.flatListRef.scrollToEnd(options);
   }

   render(){
     if (isJson(this.props.messages)) {
       var messagesArray = json2Array(this.props.messages);
       return (
          <FlatList
            ref = 'flatListRef'
            data = {messagesArray}
            renderItem = {({item, index}) => this.renderItem(item, index)}
            keyExtractor={item => item.id}
            initialNumToRender = {20}

          />
       );
     }
     return null;
   }

   renderItem(item, index){
     const messageProps = {
       ...this.props,
       currentMessage: item,
       position: isSameUser(item, this.props.myId) ? 'right' : 'left',
       showDateType: 'showTimeInDay',
       showDate: this.ShowDate(item),
       user: this.findMessageUser(item),
     };
     console.log('index is :' + index);
     return (
       <View style={[styles.listRowStyle, this.props.listRowStyle]}>
          <Message {...messageProps}/>
       </View>
     );
   }

   // 判断是否显示日期，通过时间间隔timeShowInterval判定
   ShowDate(message){
     if ( this._timeShowed != null ){
        if (moment(message.createdAt).add(-this.props.timeShowInterval, 'm').isAfter(this._timeShowed)){
          this._timeShowed = message.createdAt;
          return true;
        } else {
          return false;
        }
     } else {
       this._timeShowed = message.createdAt;
       return true;
     }
   }

   // 根据message中userid，返回该用户信息
   findMessageUser(message){
      if (isJson(this.props.users)) {
        return this.props.users[message.userId];
      } else {
        return this._userMapTmp.get(message.userId);
      }
   }

 }

const styles = StyleSheet.create({
 listRowStyle: {
   margin: 5,
 },
});

MessagesList.defaultProps = {
  listRowStyle: {},
  timeShowInterval: 10,
  users: {},
  messages: {},
  myId: null,
}

MessagesList.propTypes = {
 listRowStyle: ViewPropTypes.style,
 timeShowInterval: PropTypes.number,
 users: PropTypes.object,
 messages: PropTypes.object,
 myId: PropTypes.string,
}


module.exports = MessagesList;
