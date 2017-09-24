import React from 'react'
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import StoryContainer from '../containers/StoryContainer'
import PropTypes from 'prop-types'

export default class TopStories extends React.Component{
  static propTypes = {
    fetchTopStories: PropTypes.func,
    topStoriesGet: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.shape({
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        data: PropTypes.object,
        error: PropTypes.object
      })
    ]),
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Top Stories'
  };

  componentWillMount () {
    this.props.fetchTopStories()
  }

  keyExtractor = (item, index) => index

  renderItem = item => {
    return <StoryContainer navigate={this.props.navigation.navigate} story={item} />
  }

  render () {
    const { topStoriesGet } = this.props

    if (topStoriesGet.loaded && topStoriesGet.loading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return(
      <View>
        <FlatList
          data={topStoriesGet.data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          initialNumToRender={10}
        />
      </View>
    )
  }
}