import React, { Fragment } from 'react';
import styles from './PostComments.css';

function PostComments(props) {
  return (
    <ul className={styles.comments}>
      {
        props.comments.map(comment => (
          <li key={ comment[0].uid } className={styles['comments-item']}>Name: {comment[0].name} Comment: {comment[0].comment}</li>
        ))
      }
    </ul>
  );
}

export default PostComments;
