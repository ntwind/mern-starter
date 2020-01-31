import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';
import AddCommentWidget from './PostListItem/AddCommentWidget'

// Import Style
import styles from './PostListItem/PostListItem.css';

function PostList(props) {
  return (
    <div className="listView">
      {
        props.posts.map(post => (
          <div key={'wrapper' + post.cuid} className={styles['single-post']}>
            <PostListItem
              post={post}
              key={post.cuid}
              onDelete={() => props.handleDeletePost(post.cuid)}
            />
            <AddCommentWidget key={'form' + post.cuid}/>
            <hr className={styles.divider}/>
          </div>
        ))
      }
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostList;
