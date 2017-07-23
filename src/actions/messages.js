import * as types from '../constants/ActionTypes';

export const addMessage = message => ({
  type: types.ADD_MESSAGE, message
})
export const deleteMessage = id => ({
  type: types.DELETE_MESSAGE, id
})
