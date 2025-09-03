import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
};

const songListSlice = createSlice({
  name: 'songList',
  initialState,
  reducers: {
    storeSongList: (state, action) => {
      state.songs = action.payload;
    },
    flushSongList: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { storeSongList } = songListSlice.actions;

export default songListSlice.reducer;
