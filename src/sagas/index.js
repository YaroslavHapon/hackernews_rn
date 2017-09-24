import "regenerator-runtime/runtime";
import { all, fork } from 'redux-saga/effects'
import { fetchTopStories } from './top-stories-saga'
import { fetchStorySaga } from './story-saga'
import { fetchCommentSaga } from './comment-saga'

export default function* rootSaga() {
  yield all([
    fork(fetchTopStories),
    fork(fetchStorySaga),
    fork(fetchCommentSaga)
  ])
}