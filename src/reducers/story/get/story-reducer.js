import * as actions from './story-actions'

export const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
};

export default function storyGetReducer(state = {}, action) {
  switch (action.type ) {
    case actions.FETCH_STORY_STARTED:
      return {
        ...state,
        [action.payload.id]: {
          ...initialState,
          loading: true
        }
      }
    case actions.FETCH_STORY_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: false,
          loaded: true,
          data: action.payload.data
        }
      }
    case actions.FETCH_STORY_FAILURE:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: false,
          error: action.payload.error
        }
      }
  }
  return state;
}