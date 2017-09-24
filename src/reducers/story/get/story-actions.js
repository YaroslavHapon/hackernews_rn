export const FETCH_STORY_STARTED = 'FETCH_STORY';
export const FETCH_STORY_SUCCESS = 'FETCH_STORY_SUCCESS';
export const FETCH_STORY_FAILURE = 'FETCH_STORY_FAILURE';

export function fetchStory (id) {
  return {
    type: FETCH_STORY_STARTED,
    payload: {
      id
    }
  }
}