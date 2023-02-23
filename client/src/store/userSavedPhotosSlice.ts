import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Photo } from '../types/Photo';

interface userSavedPhotos extends Array<Photo>{}

const initialState: userSavedPhotos = []

export const userSavedPhotosSlice = createSlice({
  name: 'userSavedPhotos',
  initialState,
  reducers: {
    saveSavedPhotos: (state, action: PayloadAction<userSavedPhotos>) => state = action.payload
  }
});

// Action creators are generated for each case reducer function
export const { saveSavedPhotos } = userSavedPhotosSlice.actions;
export const selectSavedPhotos = (state: RootState) => state.userSavedPhotos;


export default userSavedPhotosSlice.reducer;
 