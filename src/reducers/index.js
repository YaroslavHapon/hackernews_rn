import { combineReducers } from 'redux'
import topStoriesGet from './topstories/get/top-stories-reducer'
import storyGet from './story/get/story-reducer'
import commentGet from './comment/get/comment-reducer'

const reducers = combineReducers({
  topStoriesGet,
  storyGet,
  commentGet
});

export default reducers