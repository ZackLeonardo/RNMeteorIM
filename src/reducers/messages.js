import * as types from '../constants/ActionTypes';

const initialState = {
   users: {
     1: {
       id: '1',
       avatar: 'https://facebook.github.io/react/img/logo_og.png'
     },
     2: {
       id: '2',
       avatar: 'https://img3.doubanio.com/img/fmadmin/large/1518146.jpg'
     }
   },

   myId: '1',
   messages: {"1":{"id":"1","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},}
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
        console.log('ADD_MESSAGE is null');
        messagesMap = {"1":{"id":"1","text":"China","userId":"1","createdAt":"1995-12-25 10:00:00","sent":true},"2":{"id":"2","text":"India","userId":"1","createdAt":"1995-12-25 10:02:00","sent":true}};
        return Object.assign({}, state, {
          messages: messagesMap
        });
        // return state;
      }

    case types.DELETE_MESSAGE:
      return state.filter((message) => {message.id !== action.id});

    default:
      return state;
  }
}
