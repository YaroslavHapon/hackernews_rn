import commentGetReducer from  './../../../src/reducers/comment/get/comment-reducer'
import * as actions from './../../../src/reducers/comment/get/comment-actions'

describe('Testing Story reducer', () => {
  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_COMMENT_STARTED,
      payload: { id: 1234 }
    };

    expect(commentGetReducer({}, startRequestAction)).toMatchSnapshot();
  });

  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_COMMENT_SUCCESS,
      payload: { id: 1234, data: { title: "New story" } }
    };

    expect(commentGetReducer({}, startRequestAction)).toMatchSnapshot();
  });

  it('should handles request start action', () => {
    const startRequestAction = {
      type: actions.FETCH_COMMENT_FAILURE,
      payload: { id: 1234, error: { message: 'Story request fails!'} }
    };

    expect(commentGetReducer({}, startRequestAction)).toMatchSnapshot();
  });
});