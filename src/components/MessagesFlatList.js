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
   TouchableOpacity,
   Button,
   StyleSheet,
 } from 'react-native';
 import PropTypes from 'prop-types';

 import moment from 'moment/min/moment-with-locales.min';

 import Message from './Message';
 import { isJson, isSameUser, array2MapById, json2Array, shallowEqual } from '../constants/utils';

 class MessagesList extends Component {

   constructor(props){
     super(props);

     this._timeShowed = null;
     this._userMapTmp = null;
     this._itemsLayout = [];

    //  this.getItemLayout = this.getItemLayout.bind(this);
    //  this.onResendPress = this.onResendPress.bind(this);
    this.itemLayoutInfo = this.itemLayoutInfo.bind(this);
   }

   componentWillMount(){
     // 判断users的类型，如果是array则转换成map
     this._userMapTmp = this.initUsersInfo(this.props.users);
   }

   componentWillUpdate(){
     this._timeShowed = null; // 组件更新时，重置使得日期显示正常
   }

   // 没必要在这里ScrollToEnd,可以在从list进入room的时候进行
  //  componentDidMount(){
     //FlatList Component Life Cycle Methods ScrollToIndex ScrollToEnd etc
     // https://stackoverflow.com/questions/43856264/flatlist-component-life-cycle-methods-scrolltoindex-scrolltoend-etc
     //但是该方法可能会因为因为时间间隔内，组件update中autoScroll，然后到期后又autoScroll导致问题
    //  let wait = new Promise((resolve) => setTimeout(resolve, 200));  // Smaller number should work
    //  wait.then( () => {
    //    console.log('componentDidMount');
    //    this.autoScroll();
    //  });
  //  }

   componentDidUpdate(){
     console.log('componentDidUpdate');
    //  this.autoScroll();
   }



   shouldComponentUpdate(nextProps, nextState){
    //  if (!shallowEqual(this.props, nextProps)) {
    //    return true;
    //  }
    //  if (!shallowEqual(this.state, nextState)) {
    //    return true;
    //  }
    //  return false;
    if ( nextProps !== null ) {
      if (this.messagesChange(this.props.messages, nextProps.messages)){
        return true;
      }
    }
    if (nextState !== null ) {
      if (this.messagesChange(this.state.messages, nextState.messages)){
        return true;
      }
    }
    return false;
   }

   // 判断messages是否发生变化
   messagesChange(messagesA, messagesB){
     var keysA = Object.keys(messagesA);
     var keysB = Object.keys(messagesB);

     if (keysA.length !== keysB.length){
       return true;
     }

     for(var i = 0; i < keysA.length; i++) {
       var key = keysA[i];

       var valueA = messagesA[key];
       var valueB = messagesB[key];

       if (valueA !== valueB){
         return true;
       }
     }
     return false;
   }

   //初始化users信息，统一成Map格式，key为id
   initUsersInfo(users){
     if (isJson(users)) {
       return null;
     } else {
       return array2MapById(users);
     }
   }

   autoScroll() {
    if (this.refs.flatListRef) {
      // this.refs.flatListRef.scrollToOffset({animated: true, offset: 44});
      console.log('autoScroll');
      this.refs.flatListRef.scrollToEnd({animated: false});
    }
   }

   getItemLayout(data, index) {
    //  let listItemRef = eval('this.listItemRef' + index);
    //  let ITEM_HEIGHT = listItemRef.measure((ox, oy, width, height, px, py) => { height});
    //  let ITEM_OFFSET = listItemRef.measure((ox, oy, width, height, px, py) => { oy});
     return {length: 40, offset: 40* index, index};
   }

   scrollToOffset(options){
     this.refs.flatListRef.scrollToOffset(options);
   }

   scrollToIndex(options){
     this.refs.flatListRef.scrollToIndex(options);
   }

   scrollToEnd(options){
     this.refs.flatListRef.scrollToEnd(options);
   }

   render(){
     this._itemsLayout = [];
      return (
         <FlatList
           ref = 'flatListRef'
           data = {isJson(this.props.messages) ? json2Array(this.props.messages): this.props.messages}
           renderItem = {({item, index}) => this.renderItem(item, index)}
           keyExtractor={item => item.id}
           initialNumToRender = {20}
           getItemLayout={this.getItemLayout}
         />
      );
   }

   renderItem(item, index){
     console.log('MessagesFlatList renderItem:' + item.id);
     const messageProps = {
       ...this.props,
       currentMessage: item,
       position: isSameUser(item, this.props.myId) ? 'right' : 'left',
       showDateType: 'showTimeInDay',
       showDate: this.ShowDate(item),
       user: this.findMessageUser(item),
       renderStatusView : () => this.renderMessageStatus(item),
     };
     return (
       <View
        ref={eval('(c) => { this.listItemRef' + index + ' = c; }')}
        style={[styles.listRowStyle, this.props.listRowStyle]}>
          <Message {...messageProps}/>
       </View>
     );
   }

   renderMessageStatus(message){
     if (message.status && message.status.includes('error')) {
       return (
         //❗️  ❕
          <Button
            onPress = {this.onResendPress.bind(this, message)}
            title = '❕'
            accessibilityLabel = 'resend message'
          />
       );
     }
     return null;
   }

   onResendPress(message){
     console.log('onResendPress message:' + JSON.stringify(message));
     if (this.props.onResendPress) {
       return this.props.onResendPress(message);
     }
     return () => {};
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
  messages: null,
  myId: null,
  onResendPress: null,
}

MessagesList.propTypes = {
 listRowStyle: ViewPropTypes.style,
 timeShowInterval: PropTypes.number,
 users: PropTypes.object,
 messages: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
 myId: PropTypes.string,
 onResendPress: PropTypes.func,
}


module.exports = MessagesList;
