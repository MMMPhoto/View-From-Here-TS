import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { Photo } from '../../types/Photo';

interface MapState {
  markers: Photo[],
  bounds: string 
};

const initialState: MapState = {
  markers: [],
  bounds: ""
}
export const mapStateSlice = createSlice({
  name: 'mapState',
  initialState, 
  reducers: {
    saveMarkers: (state, action: PayloadAction<Photo[]>) => {
      state.markers = action.payload
    },
    saveBounds: (state, action: PayloadAction<string>) => {
      state.bounds = action.payload
    }
  }
});

// Action creators are generated for each case reducer function
export const { saveMarkers, saveBounds } = mapStateSlice.actions;
export const selectMarkers = (state: RootState) => state.mapState.markers;
export const selectBounds = (state: RootState) => state.mapState.bounds;


export default mapStateSlice.reducer;
