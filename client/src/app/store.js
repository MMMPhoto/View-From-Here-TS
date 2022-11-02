import { configureStore } from '@reduxjs/toolkit';
import mapStateReducer from '../features/mapState/mapStateSlice';

export default configureStore({
  reducer: { mapState: mapStateReducer },
});