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
  updateProfileImage: (imagePath: AuthState['profileImagePath']) => void;

  reset: () => void;
};

const authInitialState: AuthState = {
  id: '',
  nickname: '',
  profileImagePath: '',
  authority: '',
};
export const useAuthStore = create(
  persist<AuthState & AuthActions>(
    (set) => ({
      ...authInitialState,
      updateAuth: (data) => set(data),
      updateProfileImage: (imagePath) => set({ profileImagePath: imagePath }),
      reset: () => {
        set(authInitialState);
      },
    }),
    {
      name: 'devooks-metadata',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);

/** signup store */
type SignupState = {
  open: boolean;
} & SignupRequest;
type SignupActions = {
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
  updateSignup: (data: SignupRequest) => void;
};

export const useSignupStore = create<SignupState & SignupActions>((set) => ({
  open: false,
  oauthId: '',
  oauthType: null,
  nickname: '',
  favoriteCategoryIdList: [],
  onOpenChange: (open) => set({ open }),
  updateSignup: (data) => set(data),
}));
