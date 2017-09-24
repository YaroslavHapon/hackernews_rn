import { buffers } from 'redux-saga'
import { take, call, put, actionChannel } from 'redux-saga/effects'
import { FETCH_STORY_STARTED, FETCH_STORY_SUCCESS, FETCH_STORY_FAILURE} from './../reducers/story/get/story-actions'
import Api from './../services/Api'

export const buffer =  buffers.dropping(50);
export function* fetchStorySaga() {
  const requestChanel = yield actionChannel(FETCH_STORY_STARTED, buffer);
  while(true) {
    const { payload: { id }} = yield take(requestChanel);
    yield call(handleStoryRequest, id);
  }
}

export function* handleStoryRequest(id) {
  try{
    const data = yield call(Api.fetchStory, id);
    yield put({ type: FETCH_STORY_SUCCESS, payload: { id, data }})
  } catch (error) {
    yield put({ type: FETCH_STORY_FAILURE, payload: error })
  }
}