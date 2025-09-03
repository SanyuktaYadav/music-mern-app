import { configureStore } from '@reduxjs/toolkit';
import currentUserDetailsReducer from '../redux/slices/currentUserDetailsSlice';


export const store = configureStore({
  reducer: {
    currentUser: currentUserDetailsReducer,
  },
});
