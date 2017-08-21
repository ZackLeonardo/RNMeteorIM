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
   roomId: 'TR2CwAfnwmr6kvWa4',
   messages: {
     "1":{"id":"1","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "2":{"id":"2","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "3":{"id":"3","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "4":{"id":"4","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "5":{"id":"5","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "6":{"id":"6","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "7":{"id":"7","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "8":{"id":"8","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "9":{"id":"9","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "10":{"id":"10","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "11":{"id":"11","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "12":{"id":"12","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "13":{"id":"13","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "14":{"id":"14","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "15":{"id":"15","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "16":{"id":"16","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
     "17":{"id":"17","text":"end","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},
   }
  // messages: {"1":{"id":"1","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},"2":{"id":"2","text":"IndiaRRR","userId":"1","createdAt":"1995-12-25 10:02:00","sent":true}}
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MESSAGE:
      if (action.message) {
        var headMessageString = JSON.stringify(state.messages);
        var tailMessageString = JSON.stringify(action.message);
        console.log('headMessageString:' + headMessageString);
        console.log('tailMessageString:' + tailMessageString);
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
