// app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import currentUserDetailsReducer from '../redux/slices/currentUserDetailsSlice';
import songListReducer from '../redux/slices/songListSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser'],
};

const rootReducer = combineReducers({
  currentUser: currentUserDetailsReducer,
  songList: songListReducer,
  // Add other reducers here if needed (not persisted)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
