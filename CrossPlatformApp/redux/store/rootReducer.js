import { combineReducers } from '@reduxjs/toolkit';
import userReducer from '../reducers/userSlice';
import postsReducer from '../reducers/postsSlice';
// import other reducers

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  // add other reducers here
});

export default rootReducer;