export type CategorySummary = {
  id: string;
  name: string;
};

export type CategoryListResponse = {
  categories: CategorySummary[];
};
