import { handleRequest, fetchCommentSaga, buffer } from './../../../src/sagas/comment-saga'
import { take, call, put, actionChannel } from 'redux-saga/effects'
import { FETCH_COMMENT_STARTED, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE} from './../../../src/reducers/comment/get/comment-actions'
import { channel } from 'redux-saga'
import Api from './../../../src/services/Api'

describe('Testing fetchCommentSaga flow', () => {
  const gen = fetchCommentSaga();
  let next = gen.next();

  it('should create fetchComment request actionChanel', () => {
    const  testChanel = actionChannel(FETCH_COMMENT_STARTED, buffer);
    expect(next.value).toEqual(testChanel);
  });

  it('should take the request chanel action', () => {
    const mockChanel = channel();
    next = gen.next(mockChanel);
    expect(next.value).toEqual(take(mockChanel));
  });

  it('should take the id and call the handleRequest', () => {
    const mockData = { payload: { id: 1 }};
    next = gen.next(mockData);
    expect(next.value).toEqual(call(handleRequest, 1));
  })
});

describe('Testing handleStory request saga', () => {
  const id = 1;
  const gen = handleRequest(id);

  let next = gen.next();
  it('should call the Api with the given id', () => {
    expect(next.value).toEqual(call(Api.fetchComment, id));
  });

  it('should call the FETCH_STORY_SUCCESS if the request succeed', () => {
    const data = { foo: 'bar' };
    next = gen.next(data);
    expect(next.value)
      .toEqual(
        put(
          {
            type: FETCH_COMMENT_SUCCESS,
            payload: {
              data,
              id
            }
          }
        )
      );
  });

  it('should call the error if error happens', () => {
    const error = new Error("Failed request");
    next = gen.throw(error);
    expect(next.value)
      .toEqual(put({ type: FETCH_COMMENT_FAILURE, payload: error }))
  });
});