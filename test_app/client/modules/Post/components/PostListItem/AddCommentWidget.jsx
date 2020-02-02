import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddCommentForm from './CommentForm'
import { connect } from 'react-redux';
// Import Style
import styles from './PostListItem.css';
import {getPostIdToComment} from "../../PostReducer";
import {commentPost} from "../../PostActions";

class AddCommentWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { formIsOpen: false };
    this.toggleFormHandler = this.toggleForm.bind(this);
  }

  toggleForm(cid){
    return this.props.dispatch(commentPost(cid));
  }

  handleFormSubmit = (formVals) => { this.props.handleAddComment(formVals) };

  render () {
    return (
      <Fragment>
        <div className={styles['post-action']}>
          <a href="#"
             onClick={(e)=> { e.nativeEvent.preventDefault(); this.toggleFormHandler(this.props.postId)}}>
            <FormattedMessage id="addComment"/>
          </a>
        {this.props.postIdToComment === this.props.postId && <AddCommentForm onSubmit = { this.handleFormSubmit } />}
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    postIdToComment: getPostIdToComment(state),
  };
}
export default connect(mapStateToProps)(AddCommentWidget);
