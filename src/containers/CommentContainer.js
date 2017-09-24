import { connect } from 'react-redux'
import Comment from './../components/Comment'
import { fetchComment } from './../reducers/comment/get/comment-actions'

const mapStateTopProps = state => ({
  commentGet: state.commentGet
});

const mapDispatchTopProps = dispatch => ({
  fetchComment: (id) => dispatch(fetchComment(id))
});

export default connect(mapStateTopProps, mapDispatchTopProps)(Comment)