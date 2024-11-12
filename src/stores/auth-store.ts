import { LoginResponse, TokenGroupType } from '@/services/login/type';
import { SignupRequest } from '@/services/member/type';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import cookieStorage from '@/lib/cookie-storage';

/** token store */
type TokenState = TokenGroupType;
type TokenActions = {
  updateToken: (data: TokenState) => void;
  logout: () => void;
};
const tokenInitialState: TokenState = {
  accessToken: null,
  refreshToken: null,
};

export const useTokenStore = create(
  persist<TokenState & TokenActions>(
    (set) => ({
      ...tokenInitialState,
      updateToken: (data) => set(data),
      logout: () => {
        set(tokenInitialState);
        window.location.href = '/login';
      },
    }),
    {
      name: 'devooks-token',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

/** auth store */
type AuthState = LoginResponse['member'];
type AuthActions = {
  updateAuth: (data: AuthState) => void;
};

export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      id: '',
      nickname: '',
      profileImagePath: '',
      authority: '',
      updateAuth: (data) => set(data),
    }),
    {
      name: 'devooks-metadata',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

/** register store */
type RegisterState = {
  open: boolean;
} & SignupRequest;
type RegisterActions = {
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
  updateRegister: (data: SignupRequest) => void;
};

export const useRegisterStore = create<RegisterState & RegisterActions>((set) => ({
  open: false,
  oauthId: '',
  oauthType: null,
  nickname: '',
  favoriteCategoryIdList: [],
  onOpenChange: (open) => set({ open }),
  updateRegister: (data) => set(data),
}));
