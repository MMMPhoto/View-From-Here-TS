import { configureStore } from '@reduxjs/toolkit';
import mapStateReducer from '../features/mapState/mapStateSlice';
import userSavedPhotosReducer from '../features/userSavedPhotos/userSavedPhotosSlice';

const store = configureStore({
  reducer: { mapState: mapStateReducer, userSavedPhotos: userSavedPhotosReducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
