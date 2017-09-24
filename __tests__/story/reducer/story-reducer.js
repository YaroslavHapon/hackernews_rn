import storyGetReducer from  './../../../src/reducers/story/get/story-reducer'
import * as actions from './../../../src/reducers/story/get/story-actions'

describe('Testing Story reducer', () => {
  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_STORY_STARTED,
      payload: { id: 1234 }
    };

    expect(storyGetReducer({}, startRequestAction)).toMatchSnapshot();
  });

  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_STORY_SUCCESS,
      payload: { id: 1234, data: { title: "New story" } }
    };

    expect(storyGetReducer({}, startRequestAction)).toMatchSnapshot();
  });

  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_STORY_FAILURE,
      payload: { id: 1234, error: { message: 'Story request fails!'} }
    };

    expect(storyGetReducer({}, startRequestAction)).toMatchSnapshot();
  });
});