import { configureStore } from '@reduxjs/toolkit';
import mapStateReducer from './mapStateSlice';
import userSavedPhotosReducer from './userSavedPhotosSlice';

const store = configureStore({
  reducer: { mapState: mapStateReducer, userSavedPhotos: userSavedPhotosReducer },
});

export type RootState = ReturnType<typeof store.getState>
export default store;
