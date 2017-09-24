import React from 'react'
import { View, Text, Linking, ActivityIndicator, StyleSheet, TouchableHighlight } from 'react-native'
import Button from './Button'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  storyContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 20,
    height: 120
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: "#2233aa",
    marginTop: 15,
    marginBottom: 15
  },
  title: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 18
  },
  storyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  storyInfoText: {
    fontSize: 12
  },
  buttonTextStyle: {
    color: '#fff',
    padding: 5
  }
});

export default class Story extends React.Component{
  static propTypes = {
    fetchStory: PropTypes.func,
    storyGet: PropTypes.oneOfType([
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

  componentWillMount () {
    this.props.fetchStory(this.props.story.item);
  }

  openUrl = url => {
    Linking.openURL(url)
  }

  onShowComments = () => {
    const { story, storyGet } = this.props;
    this.props.navigate('CommentList', { data: storyGet[story.item].data });
  }

  render () {
    const { storyGet, story } = this.props

    if(!storyGet[story.item]) {
      return <View style={styles.loadingContainer} />;
    }

    if (storyGet[story.item].loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    if (storyGet[story.item].error) {
      return (
        <View>{storyGet[story.item].error.message}</View>
      );
    }
    
    return(
      <View>
        {storyGet[story.item].data &&
          <TouchableHighlight onPress={this.onShowComments} underlayColor="#ccc">
            <View style={styles.storyContainer}>
              <Text style={styles.title}>{storyGet[story.item].data.title}</Text>
              <View style={styles.storyInfo}>
                <Text style={styles.storyInfoText}>
                  <Text>Author: </Text>
                  {storyGet[story.item].data.by}
                </Text>
                <Text style={styles.storyInfoText}>
                  <Text>Score: </Text>
                  {storyGet[story.item].data.score}
                </Text>
              </View>
              <Button
                style={styles.button}
                buttonTextStyle={styles.buttonTextStyle}
                text="Open In Browser"
                onPress={() => this.openUrl(storyGet[story.item].data.url)} />
            </View>
          </TouchableHighlight>
        }
        <View style={styles.separator}/>
      </View>
    )
  }
}