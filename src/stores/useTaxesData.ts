import {TTax} from '../models';
import {API_URL_TAXES} from '../utils/constants';
import {create} from 'zustand';

interface ITaxesDataStore {
  taxes: TTax[];
  fetchTaxes: () => void;
}

export const useTaxesDataStore = create<ITaxesDataStore>(set => ({
  taxes: [],
  fetchTaxes: async () => {
    try {
      const response = await fetch(API_URL_TAXES);
      const data = await response.json();
      set(state => ({
        ...state,
        taxes: data,
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));
