import { fetchStorySaga, handleStoryRequest, buffer } from './../../../src/sagas/story-saga'
import { take, call, put, actionChannel } from 'redux-saga/effects'
import { FETCH_STORY_STARTED, FETCH_STORY_SUCCESS, FETCH_STORY_FAILURE} from './../../../src/reducers/story/get/story-actions'
import { channel } from 'redux-saga'
import Api from './../../../src/services/Api'

describe('Testing fetchStorySaga flow', () => {
  const gen = fetchStorySaga();
  let next = gen.next();

  it('should create fetchStory request actionChanel', () => {
    const  testChanel = actionChannel(FETCH_STORY_STARTED, buffer);
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
    expect(next.value).toEqual(call(handleStoryRequest, 1));
  })
});

describe('Testing handleStory request saga', () => {
  const id = 1;
  const gen = handleStoryRequest(id);

  let next = gen.next();
  it('should call the Api with the given id', () => {
    expect(next.value).toEqual(call(Api.fetchStory, id));
  });

  it('should call the FETCH_STORY_SUCCESS if the request succeed', () => {
    const data = { foo: 'bar' };
    next = gen.next(data);
    expect(next.value)
      .toEqual(
        put(
          {
            type: FETCH_STORY_SUCCESS,
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
      .toEqual(put({ type: FETCH_STORY_FAILURE, payload: error }))
  });
});