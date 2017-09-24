import * as actions from './top-stories-actions'

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
};

export default function topStoriesGetReducer (state= initialState, action) {
  switch (action.type) {
    case actions.FETCH_TOP_STORIES_STARTED:
      return { ...state, loading: true };
    case actions.FETCH_TOP_STORIES_SUCCESS:
      return { ...state, loading: false, loaded: true, data: action.payload };
    case actions.FETCH_TOP_STORIES_FAILURE:
      return {...state, loading: false, loaded: false, error: action.payload };
  }
  return state
}