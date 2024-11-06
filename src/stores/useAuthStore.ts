import { LoginResponse } from '@/services/login/type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import cookieStorage from '@/lib/cookie-storage';

type State = Pick<LoginResponse['tokenGroup'], 'accessToken' | 'refreshToken'>;

type Actions = {
  updateAuthMetadata: (data: State) => void;
  logout: () => void;
};

const initialState: State = {
  accessToken: null,
  refreshToken: null,
};
export const useAuthStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ...initialState,
      updateAuthMetadata: (data: State) => set({ ...data }),
      logout: () => {
        set(initialState);
        window.location.href = '/login';
      },
    }),
    {
      name: 'auth-metadata',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

type UserState = LoginResponse['member'];
type UserActions = {
  setUser: (data: UserState) => void;
};
export const useUserStore = create(
  persist<UserState & UserActions>(
    (set) => ({
      id: '',
      nickname: '',
      profileImagePath: '',
      authority: '',
      setUser: (data) => set({ ...data }),
    }),
    {
      name: 'user-metadata',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
