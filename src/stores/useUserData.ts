import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';

interface Props {
  user: string | null;
  isLogin: boolean;
  setLoginUser: (user: string) => void;
  setLogOutUser: () => void;
}

export const useUserDataStore = create<Props>()(
  persist(
    set => ({
      user: null,
      isLogin: false,
      setLogOutUser: () => {
        set(state => ({
          ...state,
          isLogin: false,
          user: '',
        }));
      },
      setLoginUser: user => {
        set(state => ({
          ...state,
          isLogin: true,
          user,
        }));
      },
    }),
    {
      name: 'taxdown-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
