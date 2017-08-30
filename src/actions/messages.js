import * as types from '../constants/ActionTypes';

export const setMessages = messages => ({
  type: types.SET_MESSAGES, messages
})
export const addMessage = message => ({
  type: types.ADD_MESSAGE, message
})
export const updateMessage = (id, message) => ({
  type: types.UPDATE_MESSAGE, id, message
})
export const addMessageAsync = message => ({
  type: types.ADD_MESSAGEASYNC, message
})
export const deleteMessage = id => ({
  type: types.DELETE_MESSAGE, id
})
