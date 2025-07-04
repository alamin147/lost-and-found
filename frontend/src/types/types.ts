export type lostItem = {
  id: string;
  img: string;
  userId: string;
  categoryId: string;
  lostItemName: string;
  description: string;
  date: string;
  location: string;
  createdAt: Date;
  isFound: boolean;
  updatedAt: Date;
};

export type modals = {
  message: string;
  status: boolean;
};

export type decodedUser = {
  role: Role;
  id: string;
  email: string;
};

export type Role = "ADMIN" | "USER";
