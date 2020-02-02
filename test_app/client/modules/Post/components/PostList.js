import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Import Components
import PostListItem from './PostListItem/PostListItem';
import AddCommentWidget from './PostListItem/AddCommentWidget'
import PostComments from './PostListItem/PostComments'


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
            { post.comments.length ? <div> Comments: <PostComments comments={post.comments}   handleEditComment = { ( cuid => data => { props.handleEditComment( cuid, data )})( post.cuid ) } /></div> : null }
            <AddCommentWidget
              postId={post.cuid}
              key={'form' + post.cuid}
              handleAddComment = {( postId => data => { props.handleAddComment( postId, data )})( post.cuid ) }
            />
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
