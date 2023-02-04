import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface MapState {
  markers: Array<Object>,
  bounds: Object 
};

const initialState: MapState = {
  markers: [{}],
  bounds: {}
}
export const mapStateSlice = createSlice({
  name: 'mapState',
  initialState, 
  reducers: {
    saveMarkers: (state, action: PayloadAction<Array<Object>>) => {
      state.markers = action.payload
    },
    saveBounds: (state, action: PayloadAction<Object>) => {
      state.bounds = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { saveMarkers, saveBounds } = mapStateSlice.actions;
export const selectMapState = (state: RootState) => state.mapState;

export default mapStateSlice.reducer;
