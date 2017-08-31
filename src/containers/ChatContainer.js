/**
 * React Native IM App with DDP(Meteor)
 * the chatContainer Component which show messagesList and InputToolbar
 *
 * this.props.onSend 默认是使用meteor.call
 * @zack
 */
import React, { Component } from 'react';
import {
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
  ActionSheetIOS,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';

import Meteor, { createContainer, Tracker } from 'react-native-meteor';
import uuid1 from 'uuid/v1';

import { obj2JsonById } from '../constants/utils';
import MessagesList from '../components/MessagesFlatList';
import InputToolbar from '../components/InputToolbar';

const MIN_COMPOSER_HEIGHT = Platform.select({
  ios: 33,
  android: 41,
});
const MAX_COMPOSER_HEIGHT = 96;

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this._maxHeight = null;
    this._keyboardHeight = null;
    this._bottomOffset = null;
    this._composerHeight = MIN_COMPOSER_HEIGHT;
    this._messagesListTopOffset = 0;
    this._text = '';
    this._typingDisabled = false;

    this.state = {
      isInitialized: false, // initialization will calculate maxHeight before rendering the chat
      messagesListHeight: null,
      messagesListTopOffset: this.prepareMessagesListTopOffset(0),
      // typingDisabled: false,
    };

    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this._keyboardDidShow = this._keyboardDidShow.bind(this);
    this._keyboardDidHide = this._keyboardDidHide.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onSend = this.onSend.bind(this);
    this.showSendMessage = this.showSendMessage.bind(this);
    this.updateSendMessage = this.updateSendMessage.bind(this);
    this.onResendPress = this.onResendPress.bind(this);
  }

  // 解决InputToolbar从顶部闪现，重新render在底部问题
  componentWillMount() {
    if (this.props.layoutHeight === null ) {
      var initMessagesListHeight = Dimensions.get('window').height - this.props.minInputToolbarHeight;
      this.setState({
        messagesListHeight: initMessagesListHeight,
      })
    }

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardWillShowListener.remove();
   this.keyboardDidHideListener.remove();
   this.keyboardWillHideListener.remove();
  }

  setIsTypingDisabled(value) {
    // this.setState({
    //   typingDisabled: value
    // });
    this._typingDisabled = value;
  }

  getIsTypingDisabled() {
    return this._typingDisabled;
  }

  // 采用设置marginTop的方式而不是改变flatList的height
  _keyboardWillShow (e) {
    this.setIsTypingDisabled(true);
    this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
    this.setBottomOffset(this.props.bottomOffset);
    this._messagesListTopOffset = this.calculateMessagesListTopOffsetWithKeyboard();
    if (this.props.isAnimated === true) {
      // Animated.parallel([
      //   Animated.timing(this.state.messagesListHeight, {
      //     toValue: newMessagesListHeight,
      //     duration: 210,
      //   }).start();
      //   Animated.timing(this.imageHeight, {
      //     duration: event.duration,
      //     toValue: IMAGE_HEIGHT_SMALL,
      //   }),
      // ]).start();
      Animated.timing(this.state.messagesListTopOffset, {
        toValue: this._messagesListTopOffset,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListTopOffset: this._messagesListTopOffset,
      });
    }
    this.scrollToRight(this._messagesListTopOffset);
  }

  _keyboardDidShow (e) {
    if (Platform.OS === 'android') {
      this._keyboardWillShow(e);
    }
    this.setIsTypingDisabled(false);
  }
  _keyboardWillHide (e) {
    this.setIsTypingDisabled(true);
    this.setKeyboardHeight(0);
    this.setBottomOffset(0);
    this._messagesListTopOffset = 0;
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesListTopOffset, {
        toValue: this._messagesListTopOffset,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListTopOffset: this._messagesListTopOffset,
      });
    }
  }
  _keyboardDidHide (e) {
    if (Platform.OS === 'android') {
      this._keyboardWillHide(e);
    }
    this.setIsTypingDisabled(false);
  }

  setMaxHeight(height) {
    this._maxHeight = height;
  }

  getMaxHeight() {
    return this._maxHeight;
  }

  setKeyboardHeight(height) {
    this._keyboardHeight = height;
  }

  getKeyboardHeight() {
    return this._keyboardHeight;
  }

  setBottomOffset(value) {
    this._bottomOffset = value;
  }

  getBottomOffset() {
    return this._bottomOffset;
  }

  calculateInputToolbarHeight(composerHeight) {
    return composerHeight + this.props.minInputToolbarHeight - MIN_COMPOSER_HEIGHT;
  }

  calculateMessagesListTopOffsetWithKeyboard(composerHeight = this._composerHeight) {
    return (- this.getKeyboardHeight() - composerHeight + MIN_COMPOSER_HEIGHT - this.getBottomOffset());
  }

  prepareMessagesListTopOffset(value) {
    if (this.props.isAnimated === true) {
      return new Animated.Value(value);
    }
    return value;
  }

  // view 增加accessible，使之成为无障碍功能组件，点击即可隐藏键盘
  render(){
    return (
        <View style={styles.containerStyle}
          accessible = {true}
        >
          {this.renderMessages()}
          {this.renderInputToolbar()}
        </View>
    );
  }

  // onMainViewLayout(e){
  //   console.log('onMainViewLayout');
  //   const layout = e.nativeEvent.layout;
  //   console.log(`layout is : ${layout.x}, ${layout.y}, ${layout.width}, ${layout.height}`)
  //   if (this.getMaxHeight() !== layout.height) {
  //     this.setMaxHeight(layout.height);
  //     this.setState({
  //       messagesListHeight: this.prepareMessagesListHeight(this.calculateMessagesListHeight()),
  //     });
  //   }
  // }

  renderMessages(){
    console.log('ChatContainer renderMessages');
    const {  messages, users, myId } = this.props;
    const AnimatedView = this.props.isAnimated === true ? Animated.View : View;
    // ref='messagesListRef'
    return (
      <AnimatedView
        style = {{height: this.state.messagesListHeight, marginTop: this.state.messagesListTopOffset}}
      >
        <MessagesList

          ref={(c) => { this.messagesListRef = c }}
          {...this.props}
          messages = {messages}
          users = {users}
          myId = {myId}
          onResendPress = {this.onResendPress}
        />
      </AnimatedView>
    );
  }

  renderInputToolbar(){
    const inputToolbarProps = {
      ...this.props,
      // composerHeight: Math.max(MIN_COMPOSER_HEIGHT, this.state.composerHeight),
      //这里facebook已经正确处理了onContentSizeChange（先）和onTextChanged（后）回调的顺序
      onTextChanged: this.onInputTextChanged,
      onContentSizeChange: this.onContentSizeChange,
      onSend: this.onSend,



      textInputProps: {
        ...this.props.textInputProps,
        ref: textInput => this.textInput = textInput,
      }
    };
    return (
      <InputToolbar
        ref = 'inputToolbarRef'
        {...inputToolbarProps}
      />
    );
  }

  onInputTextChanged(text) {
    if (this.getIsTypingDisabled()) {
      return;
    }
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged(text);
    }
    // 不使用setState方式，避免每次都re-render，而多次加载MessagesList，如果使用setState，需要在组件shouldComponentUpdate方法中判定是否变化。但是如果事件频率发生过快，也会有：Native TextInput(I have to go to the gym and ) is 4 events ahead of JS - try to make your JS faster.的警告。
    // this.setState({text});
    this.refs.inputToolbarRef.refs.composerRef.setText(text);
    this._text = text;
  }

  onContentSizeChange(size){
    this._composerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, size.height));
    this._messagesListTopOffset = this.calculateMessagesListTopOffsetWithKeyboard(this._composerHeight);

    // 不使用setState方法，不re-render
    // this.setState({
    //   composerHeight: this._composerHeight,
    // });
    this.refs.inputToolbarRef.refs.composerRef.setComposerHeight(this._composerHeight);

    if (this._messagesListTopOffset !== this.state.messagesListTopOffset._value) {
      this.setState({
        messagesListTopOffset: this.prepareMessagesListTopOffset(this._messagesListTopOffset),
      });
    }
  }

  onSend(text = this._text.trim(), shouldResetInputToolbar = true) {
    message = {
      id: uuid1(),
      text: text,
      userId: this.props.myId,
      roomId: this.props.roomId,
      createdAt: new Date(),
    };

    if (shouldResetInputToolbar === true) {
      this.setIsTypingDisabled(true);
      this.resetInputToolbar();
    }

    if (this.props.onSend) {
      this.props.onSend(message);
    } else {
      this.showSendMessage(message);
      console.log('Meteor status:' + Meteor.status().connected);
      if (Meteor.status().connected) {
        this.meteorMessagesAddOne(message);
      } else {
        message.status = 'errorConnect';
        this.updateSendMessage(message);
      }
    }

    // this.scrollToEnd();

    if (shouldResetInputToolbar === true) {
      setTimeout(() => {
        this.setIsTypingDisabled(false);
      }, 100);
    }
  }

  onResendPress(message){
    // console.log('onResendPress: ' + JSON.stringify(message));
    sendMessage = Object.assign({}, message);
    if (Meteor.status().connected) {
      this.meteorMessagesAddOne(sendMessage);
    }
  }

  meteorMessagesAddOne(message){
    // 先情况status，不然老是error
    message.status = '';
    Meteor.call('Messages.addOne', message, (err, content) => {
      if (err) {
        console.log('err: ' + err.reason);
        // // 如果使用alert，会导致TextInput失去焦点，重新获取焦点比较繁琐；可以将message的状态显示为错误，点击可以重发。
        // Alert.alert(
        //   'Failed',
        //   'Message Send Failed!',
        //   [
        //     {
        //       text: 'Cancel', onPress: () => {
        //         console.log('Cancel Pressed')
        //       },
        //       style: 'cancel'
        //     },
        //     {
        //       text: 'resend', onPress: () => {
        //         console.log('resend pressed');
        //       }
        //     },
        //   ],
        //   { cancelable: false }
        // )
        message.status = 'errorSend';
        this.updateSendMessage(message);
      } else {
        message.status = 'sent';
        this.updateSendMessage(message);
      }
    });
  }

  resetInputToolbar() {
    if (this.textInput) {
      this.textInput.clear();
    }
    this._composerHeight = MIN_COMPOSER_HEIGHT;
    this._messagesListTopOffset = this.calculateMessagesListTopOffsetWithKeyboard(this._composerHeight);
    this.setState({
      composerHeight: this._composerHeight,
      messagesListTopOffset: this.prepareMessagesListTopOffset(this._messagesListTopOffset),
    });
  }

  scrollToRight(offset){
    this.scrollToOffset(false, offset);

  }

  scrollToOffset( animated = false , offset) {
    if (this.messagesListRef ===null) { return }
    console.log('ChatContainer scrollToOffset');
    this.messagesListRef.scrollToOffset({animated: animated, offset: offset});
  }

  scrollToEnd( animated = false ) {
    if (this.messagesListRef ===null) { return }
    console.log('ChatContainer scrollToEnd');
    this.messagesListRef.scrollToEnd(animated: animated);
  }

  scrollToIndex(animated = false, index ) {
    if (this.messagesListRef ===null) { return }
    console.log('ChatContainer scrollToEnd');
    this.messagesListRef.scrollToIndex({animated: animated, index: index});
  }

  showSendMessage(message){
    const { addMessage } = this.props.actions;
    addMessage(message);
  }

  updateSendMessage(message){
    const { updateMessage } = this.props.actions;
    updateMessage(message.id, message);
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
});

ChatContainer.defaultProps = {
  minInputToolbarHeight: 44,
  isAnimated: Platform.select({
    ios: true,
    android: false,
  }),
  layoutHeight: null,
  bottomOffset: 0,
  onInputTextChanged: () => {},
  onSend: null,
  myId: null,
  roomId: null,
};

ChatContainer.propTypes = {
  minInputToolbarHeight: PropTypes.number,
  isAnimated: PropTypes.bool,
  layoutHeight: PropTypes.number,  //从外层将该参数传递进来，不然会先render，再触发onMainViewLayout，会有闪现；个人认为从该组件解决此问题不如从外部解决,组件内部解决的方案是从下面闪现感觉不到。
  bottomOffset: PropTypes.number,
  onInputTextChanged: PropTypes.func,
  onSend: PropTypes.func,
  myId: PropTypes.string,
  roomId: PropTypes.string,
};

module.exports = ChatContainer;
