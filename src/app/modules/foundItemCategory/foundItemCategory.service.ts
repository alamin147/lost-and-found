import { FoundItemCategory, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createItemCategory = async (data: FoundItemCategory) => {
  const result = await prisma.foundItemCategory.create({
    data: data,
  });

  return result;
};

const getItemCategory = async () => {
  const result = await prisma.foundItemCategory.findMany();
  return result;
};

export const foundItemcategoryService = {
  createItemCategory,
  getItemCategory,
};
