export const FETCH_COMMENT_STARTED = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAILURE = 'FETCH_COMMENT_FAILURE';

export function fetchComment (id) {
  return {
    type: FETCH_COMMENT_STARTED,
    payload: {
      id,
      data: {}
    }
  }
}