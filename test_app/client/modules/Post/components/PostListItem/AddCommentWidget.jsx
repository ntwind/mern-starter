import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import AddCommentForm from './CommentForm'
// Import Style
import styles from './PostListItem.css';

export default class AddCommentWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { formIsOpen: false };
    this.toggleFormHandler = this.toggleForm.bind(this);
  }

  toggleForm(){
    this.setState({formIsOpen: !this.state.formIsOpen})
  }

  render () {
    return (
      <Fragment>
        <div className={styles['post-action']}><a href="#" onClick={(e)=> { e.nativeEvent.preventDefault(); this.toggleFormHandler()}}><FormattedMessage
          id="addComment"/></a>
        {this.state.formIsOpen && <AddCommentForm/>}
        </div>
      </Fragment>
    )
  }
}
