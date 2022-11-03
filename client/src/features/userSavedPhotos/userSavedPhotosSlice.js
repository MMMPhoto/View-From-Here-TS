import { createSlice } from '@reduxjs/toolkit';

export const userSavedPhotosSlice = createSlice({
  name: 'userSavedPhotos',
  initialState: {
    savedPhotos: [],
  },
  reducers: {
    saveSavedPhotos: (state, action) => {
      state.savedPhotos = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { saveSavedPhotos } = userSavedPhotosSlice.actions;

export default userSavedPhotosSlice.reducer;