export const FETCH_TOP_STORIES_STARTED = 'FETCH_TOP_STORIES';
export const FETCH_TOP_STORIES_SUCCESS = 'FETCH_TOP_STORIES_SUCCESS';
export const FETCH_TOP_STORIES_FAILURE = 'FETCH_TOP_STORIES_FAILURE';

export function fetchTopStories () {
  return {
    type: FETCH_TOP_STORIES_STARTED,
    payload: []
  }
}