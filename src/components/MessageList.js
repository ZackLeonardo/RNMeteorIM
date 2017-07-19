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

 class MessageList extends Component {

   constructor(props){
     super(props);
     this.renderRow = this.renderRow.bind(this);

     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.state = {
            dataSource: ds.cloneWithRows(this.props.messages),

        }
     var timeShowed;
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
       position: message.userId === this.props.user.id ? 'right' : 'left',
       showDateType: 'showTimeInDay',
       showDate: this.ShowDate(message),
     };

     return (
       <View style={[styles.listRowStyle, this.props.listRowStyle]}>
          <Message {...messageProps}/>
       </View>
     );
   }

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

 }

const styles = StyleSheet.create({
 listRowStyle: {
   margin: 5,
 },
});

MessageList.defaultProps = {
  listRowStyle: {},
  timeShowInterval: 10,
}

MessageList.propTypes = {
 listRowStyle: ViewPropTypes.style,
 timeShowInterval: PropTypes.number,
}


module.exports = MessageList;
