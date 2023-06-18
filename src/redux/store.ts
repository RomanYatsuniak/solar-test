import { combineReducers } from 'redux';
import { solarModuleSlice } from './reducers/SolarModuleSlice';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({ solar: solarModuleSlice.reducer });

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootReducer = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(makeStore);
