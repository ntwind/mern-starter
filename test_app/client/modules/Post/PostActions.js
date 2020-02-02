import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const COMMENT_POST = 'COMMENT_POST';
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}

export function addComment(cuid, comment) {
  return {
    type: ADD_COMMENT_TO_POST,
    cuid,
    comment,
  };
}

export function commentPostRequest(cuid, comment) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'post',
      {
        name: comment.name,
        comment: comment.comment
      },
    ).then(res => dispatch(addComment(cuid, res.comment)));
  };
}

export function commentPost(cuid) {
  return {
    type: COMMENT_POST,
    cuid
  };
}

export function editComment(uid) {
  return {
    type: EDIT_COMMENT,
    uid
  };
}

export function updateComment(data) {
  return {
    type: UPDATE_COMMENT,
    ...data
  };
}

export function editCommentRequest({cuid, uid, name, comment}) {
  return (dispatch) => {
    dispatch(updateComment({cuid, uid, name, comment}));
    // return callApi(`comments/${cuid}`, 'post',
    //   {
    //     name: comment.name,
    //     comment: comment.comment
    //   },
    // ).then(res => dispatch(updateComment({cuid, uid, name, comment})));
  };
}
