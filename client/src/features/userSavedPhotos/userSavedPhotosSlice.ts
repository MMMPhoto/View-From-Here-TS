import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface userSavedPhotos {
  savedPhotos: Array<Object>
};

const initialState: userSavedPhotos = {
  savedPhotos: []
};

export const userSavedPhotosSlice = createSlice({
  name: 'userSavedPhotos',
  initialState,
  reducers: {
    saveSavedPhotos: (state, action: PayloadAction<Array<Object>>) => {
      state.savedPhotos = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { saveSavedPhotos } = userSavedPhotosSlice.actions;
export const selectSavedPhotos = (state: RootState) => state.userSavedPhotos;


export default userSavedPhotosSlice.reducer;
 