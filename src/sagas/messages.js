import { actionChannel, call, take, put, race, takeEvery, all ,cancel} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import * as actions from '../actions/messages';

import { eventChannel, END } from 'redux-saga'
import Meteor, { createContainer } from 'react-native-meteor';

// Meteor.connect('ws://localhost:3000/websocket');

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
);

export function* helloSaga() {
  console.log('Hello Sagas!')
}

// export function* insertMessage(message){
//     Meteor.call('Messages.addOne', message, (err, content) => {
//       if (err) {
//         console.log('err: ' + err.reason);
//         // this.setState({ error: err.reason });
//       } else {
//         // this.setState({ message: content });
//         console.log('this state: ' + content.toString());
//         yield put({type: 'ADD_MESSAGE', message: content})
//       }
//     });
// }

function insertMessage(message) {
  return eventChannel(emitter => {
      // const iv = setInterval(() => {
      //   secs -= 1
      //   if (secs > 0) {
      //     emitter(secs)
      //   } else {
      //     // this causes the channel to close
      //     emitter(END)
      //   }
      // }, 1000);
      // // The subscriber must return an unsubscribe function
      // return () => {
      //   clearInterval(iv)
      // }

      Meteor.call('Messages.addOne', message, (err, content) => {
        if (err) {
          console.log('err: ' + err.reason);
          emitter(END)
          // this.setState({ error: err.reason });
        } else {
          // this.setState({ message: content });
          console.log('this state: ' + content.toString());
        }
      });
      return () => {

      }
    }
  )
}

export function* addMessageAsync(message) {
  console.log('addMessageAsync message :' + JSON.stringify(message));
  // yield delay(1000)
  // const m = {'18' : {id: '18', text: 'USA', userId: '1', createdAt: '1995-12-25 10:02:00',sent: true }}
  // yield takeEvery('ADD_MESSAGE',  )
  // const products = yield call(wait, 1000)
  // const resp = yield call();
  // const params = {
  //   ...message,
  //   roomId: ('TR2CwAfnwmr6kvWa4')
  // };
  message.message.roomId = 'TR2CwAfnwmr6kvWa4';

  Meteor.call('Messages.addOne', message, (err, content) => {
    if (err) {
      console.log('err: ' + err.reason);

      // this.setState({ error: err.reason });
    } else {
      // this.setState({ message: content });
      console.log('this state: ' + content.toString());
    }
  });

  // const chan = yield call(insertMessage, message)
  // try {
  //   while (true) {
  //     // take(END) will cause the saga to terminate by jumping to the finally block
  //     let ret = yield take(chan)
  //     console.log(`countdown: ${ret}`)
  //   }
  // } finally {
  //   yield put({type: 'ADD_MESSAGE', message: content});
  //   console.log('countdown terminated')
  // }
  //
  // console.log('addMessageAsync params: ' + JSON.stringify(message));



  // const data = yield call(insertMessage, message);

  // yield put({type: 'ADD_MESSAGE', message: data})

  console.log('addMessageAsync  put')
  // const winner = yield race({
  //   stopped: call(wait, 10000),
  //   tick: call(wait, 200000)
  // });
  // const m = {'3' : {id: '3', text: 'India', userId: '1', createdAt: '1995-12-25 10:02:00',sent: true}}
  // console.log('saga:');
  // // yield put({type: actions.addMessage, m})
  // if (!winner.stopped) {
  //   yield put({type: actions.addMessage, m})
  // } else {
  //   // break
  //   yield put({type: actions.addMessage, m})
  // }

}

export function* watchMessagesData() {
  console.log('watchMessagesData');
  yield takeEvery('ADD_MESSAGEASYNC', addMessageAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchMessagesData()
  ])
}
