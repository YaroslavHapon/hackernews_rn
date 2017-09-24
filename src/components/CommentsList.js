import React from 'react'
import { View, Text, FlatList } from 'react-native'
import CommentContainer from './../containers/CommentContainer'
import PropTypes from 'prop-types'

export default class CommentList extends React.PureComponent{
  static propTypes = {
    navigation: PropTypes.object
  }

  static navigationOptions = {
    title: 'Comments List'
  };

  keyExtractor = (item, index) => index

  renderItem = item => {
    return  <CommentContainer key={item.index} id={item.item} />
  }

  render () {
    const { state } = this.props.navigation

    if (!state.params.data.kids.length) {
      return <View><Text>No comments for this story!</Text></View>
    }

    return(
      <View>
        <FlatList
          data={state.params.data.kids}
          renderItem={this.renderItem}
          initialNumToRender={7}
          keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }
}