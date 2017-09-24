import { connect } from 'react-redux'
import TopStories from './../components/TopStories'
import { fetchTopStories } from './../reducers/topstories/get/top-stories-actions'

const mapStateTopProps = state => ({
  topStoriesGet: state.topStoriesGet
});

const mapDispatchTopProps = dispatch => ({
  fetchTopStories: () => dispatch(fetchTopStories())
});

export default connect(mapStateTopProps, mapDispatchTopProps)(TopStories)