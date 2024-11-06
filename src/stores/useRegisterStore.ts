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
  favoriteCategoryIdList: [],
  onOpenChange: (open: boolean) => set({ open }),
  setState: (data: SignupRequest) => set({ ...data }),
}));

type CategoryState = {
  data: { label: string; value: string }[];
};
type CategoryActions = {
  setData: (data: { label: string; value: string }[]) => void;
};

export const useCategoriesStore = create<CategoryState & CategoryActions>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
