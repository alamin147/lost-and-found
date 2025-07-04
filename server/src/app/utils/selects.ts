const foundItemSelect = {
  id: true,
  img:true,
  foundItemName: true,
  description: true,
  location: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  category: true,
};

export const selects = {
  foundItemSelect,
};
