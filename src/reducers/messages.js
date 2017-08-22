import * as types from '../constants/ActionTypes';

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
     "1":{"id":"1","text":"hello","userId":"2","createdAt":"2017-08-08 10:00:00","sent":true},
     "2":{"id":"2","text":"world","userId":"2","createdAt":"2017-08-08 10:01:00","sent":true},
     "3":{"id":"3","text":"hello","userId":"1","createdAt":"2017-08-08 10:03:00","sent":true},
     "4":{"id":"4","text":"hello","userId":"2","createdAt":"2017-08-08 10:06:00","sent":true},
     "5":{"id":"5","text":"hello","userId":"1","createdAt":"2017-08-08 10:09:00","sent":true},
     "6":{"id":"6","text":"hello","userId":"2","createdAt":"2017-08-08 10:10:00","sent":true},
     "7":{"id":"7","text":"hello","userId":"1","createdAt":"2017-08-08 10:20:00","sent":true},
     "8":{"id":"8","text":"hello","userId":"1","createdAt":"2017-08-08 10:22:00","sent":true},
     "9":{"id":"9","text":"hello","userId":"2","createdAt":"2017-08-08 10:26:00","sent":true},
     "10":{"id":"10","text":"hello","userId":"1","createdAt":"2017-08-08 10:29:00","sent":true},
     "11":{"id":"11","text":"hello","userId":"2","createdAt":"2017-08-08 10:40:00","sent":true},
     "12":{"id":"12","text":"hello","userId":"1","createdAt":"2017-08-08 10:41:00","sent":true},
     "13":{"id":"13","text":"hello","userId":"2","createdAt":"2017-08-08 10:44:00","sent":true},
     "14":{"id":"14","text":"hello","userId":"1","createdAt":"2017-08-08 10:50:00","sent":true},
     "15":{"id":"15","text":"hello","userId":"2","createdAt":"2017-08-08 10:52:00","sent":true},
     "16":{"id":"16","text":"hello","userId":"1","createdAt":"2017-08-08 10:54:00","sent":true},
     "17":{"id":"17","text":"end","userId":"2","createdAt":"2017-08-08 10:55:00","sent":true},
   }
  // messages: {"1":{"id":"1","text":"hello","userId":"1","createdAt":"2017-08-08 10:00:00","sent":true},"2":{"id":"2","text":"IndiaRRR","userId":"1","createdAt":"2017-08-08 10:02:00","sent":true}}
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MESSAGE:
      if (action.message) {
        var headMessageString = JSON.stringify(state.messages);
        var tailMessageString = JSON.stringify(action.message);
        // console.log('headMessageString:' + headMessageString);
        // console.log('tailMessageString:' + tailMessageString);
        var messageString = headMessageString.substring(0, headMessageString.length - 1) + ', ' + tailMessageString.substring(1, tailMessageString.length ) ;
        // console.log('messageString:' + messageString);

        var messagesMap = JSON.parse(messageString);

        // console.log('messagesMap: ' + JSON.stringify(messagesMap));
        return Object.assign({}, state, {
          messages: messagesMap
        });
      } else {
        return state;
      }
    case types.DELETE_MESSAGE:
      return state.filter((message) => {message.id !== action.id});

    default:
      return state;
  }
}
