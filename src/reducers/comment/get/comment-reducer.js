import * as actions from './comment-actions'

const initialState = {
  loading: false,
  loaded: false,
  data: null,
  error: null
};

export default function commentsGetReducer(state = {}, action) {
  switch (action.type) {
    case actions.FETCH_COMMENT_STARTED:
      return {
        ...state,
        [action.payload.id]: {
          ...initialState,
          loading: true
        }
      };
    case actions.FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          loading: false,
          loaded: true,
          data: action.payload.data
        }
      };
    case actions.FETCH_COMMENT_FAILURE:
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