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

          <li key={ comment[0].uid } className={ styles['comments-item'] }>
            { props.commentIdToEdit === comment[0].uid
              ?
              <EditCommentForm key={comment[0].uid} className={ styles['flex-grow'] } onSubmit = { handleFormSubmit(comment[0].uid) } initialValues={{name:comment[0].name, comment: comment[0].comment }} />
              :

            <Fragment>
              <div>
                <div>Name: {comment[0].name} </div>
                <div>Comment: {comment[0].comment}</div>
              </div>

              <div>
                <a href='#' onClick={(e) => {
                  e.preventDefault();
                  handleEditClick(comment[0].uid)
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
