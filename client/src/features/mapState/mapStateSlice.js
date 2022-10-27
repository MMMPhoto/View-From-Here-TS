import { createSlice } from '@reduxjs/toolkit';

export const mapStateSlice = createSlice({
  name: 'mapState',
  initialState: {
    markers: [{}],
    zoom: null,
    bounds: {}
  },
  reducers: {
    saveMarkers: (state, action) => {
      state.markers = action.payload
    },
    saveZoom: (state, action) => {
      state.zoom = action.payload
    },
    saveBounds: (state, action) => {
      state.bounds = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { saveMarkers, saveZoom, saveBounds } = mapStateSlice.actions;

export default mapStateSlice.reducer;