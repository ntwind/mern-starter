import React, { Fragment } from 'react';
import styles from './PostComments.css';
import { connect } from 'react-redux';
import { getCommentIdToEdit } from "../../PostReducer";
import { editComment } from "../../PostActions";
import EditCommentForm from './CommentForm'

function PostComments(props) {

  let handleEditClick = uid => {
    props.dispatch(editComment(uid));
  };

  let handleFormSubmit = uid => (formVals) => { props.handleEditComment({uid, ...formVals}) };

  return (
    <ul className={styles.comments}>
      {
        props.comments.map(comment => (

          <li key={ comment.uid } className={ styles['comments-item'] }>
            { props.commentIdToEdit === comment.uid
              ?
              <EditCommentForm key={comment.uid} className={ styles['flex-grow'] } onSubmit = { handleFormSubmit(comment.uid) } initialValues={{name:comment.name, comment: comment.comment }} />
              :

            <Fragment>
              <div>
                <div>Name: {comment.name} </div>
                <div>Comment: {comment.comment}</div>
              </div>

              <div>
                <a href='#' onClick={(e) => {
                  e.preventDefault();
                  handleEditClick(comment.uid)
                }}> Edit</a>
              </div>
            </Fragment>
            }
          </li>

        ))
      }
    </ul>
  );
}

function mapStateToProps(state) {
  return {
    commentIdToEdit: getCommentIdToEdit(state),
  };
}
export default connect(mapStateToProps)(PostComments);
