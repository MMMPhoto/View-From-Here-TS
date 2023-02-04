import { configureStore } from '@reduxjs/toolkit';
import mapStateReducer from '../features/mapState/mapStateSlice';
import userSavedPhotosReducer from '../features/userSavedPhotos/userSavedPhotosSlice';

export default configureStore({
  reducer: { mapState: mapStateReducer, userSavedPhotos: userSavedPhotosReducer },
});