import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native'
import HTMLView from 'react-native-htmlview';
import CommentContainer from './../containers/CommentContainer'
import Button from './Button'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  loadingContainer: {
    flex: 1,
    paddingTop: 20
  },
  kidsContainer: {
    borderLeftWidth: 1,
    borderColor: '#888',
    marginLeft: 10,
    marginTop: 10,
    paddingLeft: 10
  },
  author: {
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10
  },
  buttonTextStyle: {
    color: '#333',
    padding: 5,
    fontWeight: 'bold',
    fontSize: 12
  }
});

export default class Comment extends React.Component{
  static propTypes = {
    fetchComment: PropTypes.func,
    commentGet: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.shape({
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        data: PropTypes.object,
        error: PropTypes.object
      })
    ]),
    id: PropTypes.number
  }

  state = {
    showAnswers: false
  }

  componentWillMount () {
    this.props.fetchComment(this.props.id);
  }

  renderKidsComments = kids => {
    return kids.map((kid, index) => <CommentContainer innerStyle={styles.kidsContainer} key={index} id={kid} />);
  }

  render () {
    const { commentGet } = this.props

    if(!commentGet[this.props.id]) {
      return <View style={styles.loadingContainer} />;
    }
    
    if (commentGet[this.props.id].loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    if (commentGet[this.props.id].error) {
      return (
        <View>{commentGet[this.props.id].error.message}</View>
      );
    }

    const html = commentGet[this.props.id].data.text;
    const kids = commentGet[this.props.id].data.kids;

    return(
      <View style={this.props.innerStyle || styles.commentContainer}>
        <Text style={styles.author}>Author: {commentGet[this.props.id].data.by}</Text>
        <HTMLView
          style={styles.webView}
          onLinkPress={(url) => Linking.openURL(url)}
          value={html} />
        {kids &&
          <View>
            <Button
              text={!this.state.showAnswers ? 'Show Answers ↓' : 'Hide Answers ↑'}
              style={styles.button}
              buttonTextStyle={styles.buttonTextStyle}
              onPress={() => this.setState({ showAnswers: !this.state.showAnswers })}/>
            {this.state.showAnswers && this.renderKidsComments(kids)}
          </View>
        }
      </View>
    )
  }
}
