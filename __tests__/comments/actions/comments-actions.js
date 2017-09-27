import { fetchComment } from './../../../src/reducers/comment/get/comment-actions'
import * as actions from './../../../src/reducers/comment/get/comment-actions'

describe('Testing fetch comment action', () => {
  it('should return the right id and format', () => {
    expect(fetchComment(1)).toEqual(
      {
        type: actions.FETCH_COMMENT_STARTED,
        payload: {
          id: 1
        }
      }
    )
    expect(fetchComment(1)).toMatchSnapshot();
  });
});