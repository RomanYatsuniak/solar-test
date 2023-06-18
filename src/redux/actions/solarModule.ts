import { BASE_URL } from '@/consts';
import { SolarModule } from '@/types/SolarModule';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSolarModule = createAsyncThunk(
  'solar/fetchData',
  async (_, thunkApi) => {
    try {
      const response = await axios.get(BASE_URL);
      const deserializedModuleData: Partial<SolarModule> = {};
      for (const key in response.data) {
        const deserializedKey = key.replace(/\s/g, '') as keyof SolarModule;
        deserializedModuleData[deserializedKey] = response.data[key];
      }
      return deserializedModuleData as SolarModule;
    } catch (error) {
      return thunkApi.rejectWithValue('Failed to fetch solar modules');
    }
  }
);
