/**
 * React Native IM App with DDP(Meteor)
 * the Component which show user talking message in ListView
 *
 * @zack
 */

 import React, { Component } from 'react';
 import {
   ListView,
   View,
   ViewPropTypes,
   StyleSheet,
 } from 'react-native';
 import PropTypes from 'prop-types';

 import moment from 'moment/min/moment-with-locales.min';

 import Message from './Message';
 import { isJson, isSameUser, array2MapById } from '../constants/utils'

 class MessageList extends Component {

   constructor(props){
     super(props);
     this.renderRow = this.renderRow.bind(this);

     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
            dataSource: ds.cloneWithRows(this.props.messages),

        }
     var timeShowed;
     var userMapTmp;
   }

   componentWillMount(){
     // 判断users的类型，如果是array则转换成map
     this.userMapTmp = this.initUsersInfo(this.props.users);
   }

   //初始化users信息，统一成Map格式，key为id
   initUsersInfo(users){
     if (isJson(users)) {
       return null;
     } else {
       return array2MapById(users);
     }
   }

   render(){
     return (
       <View>
        <ListView
          enableEmptySections = { true }
          automaticallyAdjustContentInsets = { false }
          initialListSize = { 20 }
          pageSize = { 20 }

          dataSource = {this.state.dataSource}

          renderRow = {this.renderRow}

        />
       </View>
     );
   }

   renderRow(message){
     const messageProps = {
       ...this.props,
       currentMessage: message,
       position: isSameUser(message, this.props.myId) ? 'right' : 'left',
       showDateType: 'showTimeInDay',
       showDate: this.ShowDate(message),
       user: this.findMessageUser(message),
     };

     return (
       <View style={[styles.listRowStyle, this.props.listRowStyle]}>
          <Message {...messageProps}/>
       </View>
     );
   }

   // 判断是否显示日期，通过时间间隔timeShowInterval判定
   ShowDate(message){
     if ( this.timeShowed != null ){
        if (moment(message.createdAt).add(-this.props.timeShowInterval, 'm').isAfter(this.timeShowed)){
          this.timeShowed = message.createdAt;
          return true;
        } else {
          return false;
        }
     } else {
       this.timeShowed = message.createdAt;
       return true;
     }
   }

   // 根据message中userid，返回该用户信息
   findMessageUser(message){
      if (isJson(this.props.users)) {
        return this.props.users[message.userId];
      } else {
        return this.userMapTmp.get(message.userId);
      }
   }

 }

const styles = StyleSheet.create({
 listRowStyle: {
   margin: 5,
 },
});

MessageList.defaultProps = {
  listRowStyle: {},
  timeShowInterval: 10,
  users: {},
  messages: {},
  myId: null,
}

MessageList.propTypes = {
 listRowStyle: ViewPropTypes.style,
 timeShowInterval: PropTypes.number,
 users: PropTypes.object,
 messages: PropTypes.object,
 myId: PropTypes.string,
}


module.exports = MessageList;
