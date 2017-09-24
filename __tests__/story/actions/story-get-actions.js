import { fetchStory } from './../../../src/reducers/story/get/story-actions'
import * as actions from './../../../src/reducers/story/get/story-actions'

describe('Testing story fetch action', () => {
  it('should return the right id and format', () => {
    expect(fetchStory(1)).toEqual(
      {
        type: actions.FETCH_STORY_STARTED,
        payload: {
          id: 1
        }
      }
    )
    expect(fetchStory(1)).toMatchSnapshot();
  });
});