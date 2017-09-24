import { connect } from 'react-redux'
import Story from './../components/Story'
import { fetchStory } from './../reducers/story/get/story-actions'

const mapStateTopProps = state => ({
  storyGet: state.storyGet
});

const mapDispatchTopProps = dispatch => ({
  fetchStory: (id) => dispatch(fetchStory(id))
});

export default connect(mapStateTopProps, mapDispatchTopProps)(Story)