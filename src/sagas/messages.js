import { actionChannel, call, take, put, race, takeEvery, all ,cancel} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import * as actions from '../actions/messages';

// wait :: Number -> Promise
const wait = ms => (
  new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
);

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* addMessageAsync() {
  console.log('addMessageAsync');
  yield delay(1000)
  const m = {'3' : {id: '3', text: 'USA', userId: '1', createdAt: '1995-12-25 10:02:00',sent: true }}
  // yield takeEvery('ADD_MESSAGE',  )
  // const products = yield call(wait, 1000)
  yield put({type: 'ADD_MESSAGE', message: m})

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
  yield takeEvery('ADD_MESSAGE', addMessageAsync)
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchMessagesData()
  ])
}
