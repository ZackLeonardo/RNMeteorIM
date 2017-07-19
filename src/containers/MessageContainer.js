/**
 * React Native IM App with DDP(Meteor)
 * the container which shwo messages in ListView
 *
 * @zack
 */
import React, { Component } from 'react';
import {
  View,
  ViewPropTypes,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';

class MessageContainer extends Component{
  constructor(props){
    super(props);

    this.state = {

    };
  }

  render(){
    return (
      <View>
        <ListView
          enableEmptySections = {true}
          automaticallyAdjustContentInsets = {false}
          initialListSize = {20}
          pageSize = {20}

          dataSource = {this.state.dataSource}

          renderRow = {this.renderRow()}
        />
      </View>
    );
  }
}

module.exports = MessageContainer;
