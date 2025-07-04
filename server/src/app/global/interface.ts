export type TLogin = {
  email: string;
  username?: string;
  password: string;
};
export type newPassword = {
  newPassword: string;
  currentPassword: string;
};

export type TFilter = {
  searchTerm?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  foundItemName?: string;
};
