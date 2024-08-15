import { create } from 'zustand';

import { SignupRequest } from '@/modules/member/type';

type State = {
  open: boolean;
} & SignupRequest;

type Actions = {
  onOpenChange: React.Dispatch<React.SetStateAction<any>>;
};

export const useRegisterStore = create<State & Actions>((set, get) => ({
  open: true,
  oauthId: '',
  oauthType: null,
  nickname: '',
  favoriteCategories: [],
  onOpenChange: (data: State) => set({ ...data }),
}));
