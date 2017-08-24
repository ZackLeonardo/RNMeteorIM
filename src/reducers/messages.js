import * as types from '../constants/ActionTypes';

import { json2Array } from '../constants/utils';

const initialState = {
  //  users: [
  //   {
  //     id: '1',
  //     avatar: 'https://facebook.github.io/react/img/logo_og.png'
  //   },
  //   {
  //     id: '2',
  //     avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
  //   },
  // ],
   users: {
     '1': {
       id: '1',
       avatar: 'https://facebook.github.io/react/img/logo_og.png'
     },
     '2': {
       id: '2',
       avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
     }
   },

   myId: '1',
   roomId: '134fb7f0-86df-11e7-8347-f14dca35fc33',
   messages: {
     "1":{"id":"1","text":"hello","userId":"2","createdAt":"2017-08-08 10:00:00",},
     "2":{"id":"2","text":"world","userId":"2","createdAt":"2017-08-08 10:01:00","status":""},
     "3":{"id":"3","text":"hello","userId":"1","createdAt":"2017-08-08 10:03:00","status":"errorSend"},
     "4":{"id":"4","text":"hello","userId":"2","createdAt":"2017-08-08 10:06:00","status":"errorConnect"},
     "5":{"id":"5","text":"hello","userId":"1","createdAt":"2017-08-08 10:09:00","status":"sent"},
     "6":{"id":"6","text":"hello","userId":"2","createdAt":"2017-08-08 10:10:00","status":"errorSend"},
     "7":{"id":"7","text":"hello","userId":"1","createdAt":"2017-08-08 10:20:00","status":"errorSend"},
     "8":{"id":"8","text":"hello","userId":"1","createdAt":"2017-08-08 10:22:00","status":"errorSend"},
     "9":{"id":"9","text":"hello","userId":"2","createdAt":"2017-08-08 10:26:00","status":"errorSend"},
     "10":{"id":"10","text":"hello","userId":"1","createdAt":"2017-08-08 10:29:00","status":"errorSend"},
     "11":{"id":"11","text":"hello","userId":"2","createdAt":"2017-08-08 10:40:00","status":"errorSend"},
     "12":{"id":"12","text":"hello","userId":"1","createdAt":"2017-08-08 10:41:00","status":"errorSend"},
     "13":{"id":"13","text":"hello","userId":"2","createdAt":"2017-08-08 10:44:00","status":"errorSend"},
     "14":{"id":"14","text":"hello","userId":"1","createdAt":"2017-08-08 10:50:00","status":"errorSend"},
     "15":{"id":"15","text":"hello","userId":"2","createdAt":"2017-08-08 10:52:00","status":"errorSend"},
     "16":{"id":"16","text":"hello","userId":"1","createdAt":"2017-08-08 10:54:00","status":"errorSend"},
     "17":{"id":"17","text":"https://facebook.github.io/react/img/logo_og.png","userId":"2","createdAt":"2017-08-08 10:55:00","status":"errorSend"},
   }
  // messages: {"1":{"id":"1","text":"hello","userId":"1","createdAt":"2017-08-08 10:00:00","status":"errorSend"},"2":{"id":"2","text":"IndiaRRR","userId":"1","createdAt":"2017-08-08 10:02:00","status":"errorSend"}}
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MESSAGE:
      if (action.message) {
        // var newState = state;
        // newState.messages[action.message.id] = action.message;
        // return newState;

        state.messages[action.message.id] = action.message;
        return state;
      } else {
        return state;
      }

    case types.UPDATE_MESSAGE:
      if (action.id) {
        var newState = {};
        for (var key in state){
          if (key === 'messages') {
            newState[key] = {};
            for (var messageKey in state[key]) {
              if (messageKey === action.id) {
                newState[key][messageKey] = action.message;
              } else {
                newState[key][messageKey] = state[key][messageKey];
              }
            }
          } else {
            newState[key] = state[key];
          }
        }
        return newState;
      } else {
        return state;
      }

    case types.DELETE_MESSAGE:
      return state.filter((message) => {message.id !== action.id});

    default:
      return state;
  }
}
