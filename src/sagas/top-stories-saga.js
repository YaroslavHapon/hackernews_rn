import { call, put, take } from 'redux-saga/effects'
import Api from './../services/Api'
import { FETCH_TOP_STORIES_STARTED, FETCH_TOP_STORIES_SUCCESS, FETCH_TOP_STORIES_FAILURE } from './../reducers/topstories/get/top-stories-actions'

export function* fetchTopStories() {
  while (true){
    yield take(FETCH_TOP_STORIES_STARTED)
    try {
      const data = yield call(Api.fetchTopStories);
      yield put({ type: FETCH_TOP_STORIES_SUCCESS, payload: data })
    } catch (error) {
      yield put({ type: FETCH_TOP_STORIES_FAILURE, payload: error })
    }
  }
}