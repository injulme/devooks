import { create } from 'zustand';

type CategoryState = {
  categories: { label: string; value: string }[];
};
type CategoryActions = {
  updateCategory: (data: CategoryState) => void;
};

export const useCategoryStore = create<CategoryState & CategoryActions>((set) => ({
  categories: [],
  updateCategory: (data) => set(data),
}));
