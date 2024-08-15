import { create } from 'zustand';

import { SignupRequest } from '@/modules/member/type';

type State = {
  open: boolean;
} & SignupRequest;

type Actions = {
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
  setState: (data: SignupRequest) => void;
};

export const useRegisterStore = create<State & Actions>((set, get) => ({
  open: false,
  oauthId: '',
  oauthType: null,
  nickname: '',
  favoriteCategories: [],
  onOpenChange: (open: boolean) => set({ open }),
  setState: (data: SignupRequest) => set({ ...data }),
}));
