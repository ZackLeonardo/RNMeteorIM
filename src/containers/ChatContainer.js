/**
 * React Native IM App with DDP(Meteor)
 * the chatContainer Component which show messagesList and InputToolbar
 *
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
} from 'react-native';
import PropTypes from 'prop-types';

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

    this.state = {
      isInitialized: false, // initialization will calculate maxHeight before rendering the chat
      messagesListHeight: null,
      messagesListTopOffset: this.prepareMessagesListTopOffset(0),
      typingDisabled: false
    };

    this.onSend = this.onSend.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);

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
  }

  componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardWillShowListener.remove();
  }

  // 采用设置marginTop的方式而不是改变flatList的height
  _keyboardWillShow (e) {
    console.log('Keyboard will Show');
    // this.setIsTypingDisabled(true);
    this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
    this.setBottomOffset(this.props.bottomOffset);
    const newMessagesListTopOffset = this.calculateMessagesListTopOffsetWithKeyboard();
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
        toValue: newMessagesListTopOffset,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListTopOffset: newMessagesListTopOffset,
      });
    }
  }

  _keyboardDidShow (e) {
    console.log('Keyboard Shown');

  }
  _keyboardWillHide (e) {
    console.log('Keyboard will Hide');
    // this.setIsTypingDisabled(true);
    this.setKeyboardHeight(0);
    this.setBottomOffset(0);
    const newMessagesListTopOffset = 0;
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesListTopOffset, {
        toValue: newMessagesListTopOffset,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListTopOffset: newMessagesListTopOffset,
      });
    }
  }
  _keyboardDidHide (e) {
    console.log('Keyboard Hidden');
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
    console.log('renderMessages:' + this.state.messagesListTopOffset);
    const {  messages, users, myId } = this.props;
    const AnimatedView = this.props.isAnimated === true ? Animated.View : View;
    return (
      <AnimatedView
        style = {{height: this.state.messagesListHeight, marginTop: this.state.messagesListTopOffset}}
      >
        <MessagesList ref='messagesListRef'
          {...this.props}
          messages={messages}
          users = {users}
          myId = {myId}
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
    console.log('onInputTextChanged');
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged(text);
    }
    // 不使用setState方式，避免每次都re-render，而多次加载MessagesList
    // this.setState({text});
    this.refs.inputToolbarRef.refs.composerRef.setText(text);
  }

  onContentSizeChange(size){
    this._composerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, size.height));
    console.log('onContentSizeChange:' + this._composerHeight);
    var newMessagesListTopOffset = this.calculateMessagesListTopOffsetWithKeyboard(this._composerHeight);

    // 不使用setState方法，不re-render
    // if (newComposerHeight !== this._composerHeight) {
    //   console.log('newComposerHeight:' + newComposerHeight);
    //   this.setState({
    //     composerHeight: newComposerHeight,
    //   });
    // }
    //
    this.refs.inputToolbarRef.refs.composerRef.setComposerHeight(this._composerHeight);


    if (newMessagesListTopOffset !== this.state.messagesListTopOffset._value) {
      console.log('newMessagesListTopOffset:' + newMessagesListTopOffset);
      this.setState({
        messagesListTopOffset: this.prepareMessagesListTopOffset(newMessagesListTopOffset),
      });
    }

    // this.scrollToEnd();
  }

  onSend(messages = [], shouldResetInputToolbar = false) {
    // if (!Array.isArray(messages)) {
    //   messages = [messages];
    // }
    //
    // messages = messages.map((message) => {
    //   return {
    //     ...message,
    //     user: this.props.user,
    //     createdAt: new Date(),
    //   };
    // });
    //
    // if (shouldResetInputToolbar === true) {
    //   this.setIsTypingDisabled(true);
    //   this.resetInputToolbar();
    // }
    this.scrollToEnd();
  }

  resetInputToolbar() {

  }

  setIsTypingDisabled(value) {
    this.setState({
      typingDisabled: value
    });
  }

  scrollToEnd( animated = false ) {
    if (this.refs.messagesListRef ===null) { return }
    console.log('ChatContainer scrollToEnd');
    this.refs.messagesListRef.scrollToEnd(animated: animated);
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

};

ChatContainer.propTypes = {
  minInputToolbarHeight: PropTypes.number,
  isAnimated: PropTypes.bool,
  layoutHeight: PropTypes.number,  //从外层将该参数传递进来，不然会先render，再触发onMainViewLayout，会有闪现；个人认为从该组件解决此问题不如从外部解决,组件内部解决的方案是从下面闪现感觉不到。
  bottomOffset: PropTypes.number,
  onInputTextChanged: PropTypes.func,
};

module.exports = ChatContainer;
