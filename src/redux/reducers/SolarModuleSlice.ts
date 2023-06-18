import { SolarModule } from '@/types/SolarModule';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSolarModule } from '../actions/solarModule';
import { HYDRATE } from 'next-redux-wrapper';

interface InitialState {
  solarModule: SolarModule | null;
  isLoading: boolean;
  error: string;
  pickedModule: keyof SolarModule | null;
  pickedQuantity: number | null;
}

const initialState: InitialState = {
  solarModule: null,
  isLoading: false,
  error: '',
  pickedModule: null,
  pickedQuantity: null,
};

export const solarModuleSlice = createSlice({
  name: 'solar',
  initialState,
  reducers: {
    setPickedModule: (state, action: PayloadAction<keyof SolarModule>) => {
      state.pickedModule = action.payload;
      state.pickedQuantity = null;
    },
    resetPickedModule: (state) => {
      state.pickedModule = null;
    },
    setPickedQuantity: (state, action: PayloadAction<number>) => {
      state.pickedQuantity = action.payload;
    },
    resetPickedQuantity: (state) => {
      state.pickedModule = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.solar,
      };
    },
    [fetchSolarModule.fulfilled.type]: (
      state,
      action: PayloadAction<SolarModule>
    ) => {
      state.solarModule = action.payload;
      state.isLoading = false;
    },
    [fetchSolarModule.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [fetchSolarModule.pending.type]: (state) => {
      state.isLoading = true;
    },
  },
});

export const {
  setPickedModule,
  setPickedQuantity,
  resetPickedModule,
  resetPickedQuantity,
} = solarModuleSlice.actions;

export default solarModuleSlice.reducer;
