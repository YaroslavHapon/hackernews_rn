import React from 'react'
import { AppRegistry, View, Text, FlatList } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './../reducers/index'
import { StackNavigator } from 'react-navigation'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './../sagas/index'

import CommentList from './CommentsList'
import TopStoriesContainer from './../containers/TopStoriesContainer'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const Navigator = StackNavigator({
  TopStories: { screen: TopStoriesContainer },
  CommentList: { screen: CommentList }
});

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

export default App

