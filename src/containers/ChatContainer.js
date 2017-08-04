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
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

import MessagesList from '../components/MessagesList';
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

    this.state = {
      isInitialized: false, // initialization will calculate maxHeight before rendering the chat
      composerHeight: MIN_COMPOSER_HEIGHT,
      messagesListHeight: null,
      typingDisabled: false
    };

    this.onMainViewLayout = this.onMainViewLayout.bind(this);
    this.onSend = this.onSend.bind(this);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.onInputTextChanged = this.onInputTextChanged.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);

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

  calculateMessagesListHeight(composerHeight = this.state.composerHeight) {
    return this.getMaxHeight() - this.calculateInputToolbarHeight(composerHeight);
  }

  calculateMessagesListHeightWithKeyboard(composerHeight = this.state.composerHeight) {
    return this.calculateMessagesListHeight(composerHeight) - this.getKeyboardHeight() + this.getBottomOffset();
  }

  prepareMessagesListHeight(value) {
    if (this.props.isAnimated === true) {
      return new Animated.Value(value);
    }
    return value;
  }

  // 解决InputToolbar从顶部闪现，重新render在底部问题
  componentWillMount() {
    if (this.props.layoutHeight === null ) {
      this.setState({
        messagesListHeight: Dimensions.get('window').height,
      })
    }

    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardWillHide);
  }

  componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardWillShowListener.remove();
  }

  _keyboardWillShow (e) {
    console.log('Keyboard will Show');
    // this.setIsTypingDisabled(true);
    this.setKeyboardHeight(e.endCoordinates ? e.endCoordinates.height : e.end.height);
    this.setBottomOffset(this.props.bottomOffset);
    const newMessagesListHeight = this.calculateMessagesListHeightWithKeyboard();
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesListHeight, {
        toValue: newMessagesListHeight,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListHeight: newMessagesListHeight,
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
    const newMessagesListHeight = this.calculateMessagesListHeight();
    if (this.props.isAnimated === true) {
      Animated.timing(this.state.messagesListHeight, {
        toValue: newMessagesListHeight,
        duration: 210,
      }).start();
    } else {
      this.setState({
        messagesListHeight: newMessagesListHeight,
      });
    }
  }
  _keyboardDidHide (e) {
    console.log('Keyboard Hidden');
  }

  // view 增加accessible，使之成为无障碍功能组件，点击即可隐藏键盘
  render(){
    return (
        <View style={styles.containerStyle}
          onLayout={this.onMainViewLayout}
          accessible = {true}
        >
          {this.renderMessages()}
          {this.renderInputToolbar()}
        </View>
    );
  }

  onMainViewLayout(e){
    const layout = e.nativeEvent.layout;
    console.log(`layout is : ${layout.x}, ${layout.y}, ${layout.width}, ${layout.height}`);
    if (this.getMaxHeight() !== layout.height) {
      this.setMaxHeight(layout.height);
      this.setState({
        messagesListHeight: this.prepareMessagesListHeight(this.calculateMessagesListHeight()),
      });
    }
  }

  renderMessages(){
    const {  messages, users, myId } = this.props;
    const AnimatedView = this.props.isAnimated === true ? Animated.View : View;
    return (
      <AnimatedView
        style = {{height: this.state.messagesListHeight}}
      >
        <MessagesList
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
      text: this.state.text,
      composerHeight: Math.max(MIN_COMPOSER_HEIGHT, this.state.composerHeight),
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
        {...inputToolbarProps}
      />
    );
  }

  onInputTextChanged(text) {
    console.log('onInputTextChanged');
    if (this.props.onInputTextChanged) {
      this.props.onInputTextChanged(text);
    }
    this.setState({text});
  }

  onContentSizeChange(size){
    console.log('onContentSizeChange');
    const newComposerHeight = Math.max(MIN_COMPOSER_HEIGHT, Math.min(MAX_COMPOSER_HEIGHT, size.height));
    const newMessagesListHeight = this.calculateMessagesListHeightWithKeyboard(newComposerHeight);
    this.setState({
      composerHeight: newComposerHeight,
      messagesListHeight: this.prepareMessagesListHeight(newMessagesListHeight),
    });
  }

  onSend(messages = [], shouldResetInputToolbar = false) {
    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    messages = messages.map((message) => {
      return {
        ...message,
        user: this.props.user,
        createdAt: new Date(),
      };
    });

    if (shouldResetInputToolbar === true) {
      this.setIsTypingDisabled(true);
      this.resetInputToolbar();
    }
  }

  resetInputToolbar() {

  }

  setIsTypingDisabled(value) {
    this.setState({
      typingDisabled: value
    });
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
