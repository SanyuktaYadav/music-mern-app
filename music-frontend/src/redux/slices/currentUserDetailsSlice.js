import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const currentUserDetailsSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    storeCurrentUserDetails: (state, action) => {
      state.user = { ...action.payload };
    },
  },
});

export const { storeCurrentUserDetails } = currentUserDetailsSlice.actions;

export default currentUserDetailsSlice.reducer;
