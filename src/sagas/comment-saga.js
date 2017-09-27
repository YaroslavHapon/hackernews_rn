import { put, take, actionChannel, call } from 'redux-saga/effects'
import { buffers } from 'redux-saga'
import { FETCH_COMMENT_STARTED, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE } from './../reducers/comment/get/comment-actions'
import Api from './../services/Api'

export const buffer =  buffers.dropping(50);
export function* fetchCommentSaga() {
  const actionChan = yield actionChannel(FETCH_COMMENT_STARTED, buffer);
  while (true) {
    const { payload: { id }} = yield take(actionChan);
    yield call(handleRequest, id)
  }
}

export function* handleRequest (id) {
  try {
    const data = yield call(Api.fetchComment, id);
    yield put({ type: FETCH_COMMENT_SUCCESS, payload: { id, data }})
  } catch (error) {
    yield put({ type: FETCH_COMMENT_FAILURE, payload: error })
  }
}