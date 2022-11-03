import { createSlice } from '@reduxjs/toolkit';

export const mapStateSlice = createSlice({
  name: 'mapState',
  initialState: {
    markers: [{}],
    bounds: null
  },
  reducers: {
    saveMarkers: (state, action) => {
      state.markers = action.payload
    },
    saveBounds: (state, action) => {
      state.bounds = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { saveMarkers, saveBounds } = mapStateSlice.actions;

export default mapStateSlice.reducer;