import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import thunk, { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Define AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
