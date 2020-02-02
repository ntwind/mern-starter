import {ADD_POST, ADD_POSTS, ADD_COMMENT_TO_POST, DELETE_POST, COMMENT_POST, EDIT_COMMENT, UPDATE_COMMENT} from './PostActions';

// Initial State
const initialState = { data: [], addingCommentToPost: void 0, editingCommentUid: void 0 };

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
        return { data: [ ...state.data], addingCommentToPost: void 0}
      }

    case COMMENT_POST:
      return {
        ...state,  addingCommentToPost: action.cuid,
      };

    case EDIT_COMMENT:
      return {
        ...state, editingCommentUid: action.uid,
      };

    case UPDATE_COMMENT :
      if(1) {
        let post = state.data.find(post => post.cuid === action.cuid);
        let comment = post.comments.find(comment => comment[0].uid === action.uid );
        comment[0].name = action.name;
        comment[0].comment = action.comment;
        return { data: [ ...state.data], editingCommentUid: void 0}
      }

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

// Get comment uid to comment
export const getCommentIdToEdit = state => state.posts.editingCommentUid;

// Export Reducer
export default PostReducer;
