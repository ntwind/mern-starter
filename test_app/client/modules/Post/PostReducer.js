import {ADD_POST, ADD_POSTS, ADD_COMMENT_TO_POST, DELETE_POST, COMMENT_POST} from './PostActions';

// Initial State
const initialState = { data: [], addingCommentToPost: void 0 };

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST :
      return {
        ...state, data: [action.post, ...state.data],
      };

    case ADD_POSTS :
      return {
        ...state, data: action.posts,
      };

    case DELETE_POST :
      return {
        data: state.data.filter(post => post.cuid !== action.cuid),
      };

    case ADD_COMMENT_TO_POST :
      if(1) { // creating scope to use 'let'
        let post = state.data.find(post => post.cuid === action.cuid);
        post.comments.push([action.comment]);
        return { data: [ ...state.data]}
      }

    case COMMENT_POST:
      return {
        data: state.data, addingCommentToPost: action.cuid,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getPosts = state => state.posts.data;

// Get post by cuid
export const getPost = (state, cuid) => state.posts.data.filter(post => post.cuid === cuid)[0];

// Get post cid to comment
export const getPostIdToComment = state => state.posts.addingCommentToPost;

// Export Reducer
export default PostReducer;
