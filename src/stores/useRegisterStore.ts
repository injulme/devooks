import { SignupRequest } from '@/services/member/type';
import { create } from 'zustand';

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
