import { ItemCategory } from "@prisma/client";
import prisma from "../../config/prisma";

const createItemCategory = async (data: ItemCategory) => {
  const result = await prisma.itemCategory.create({
    data: data,
  });

  return result;
};

const getItemCategory = async () => {
  const result = await prisma.itemCategory.findMany();
  return result;
};

const updateItemCategory = async (id: string, data: Partial<ItemCategory>) => {
  const result = await prisma.itemCategory.update({
    where: { id },
    data: data,
  });
  return result;
};

const deleteItemCategory = async (id: string) => {
  const result = await prisma.itemCategory.delete({
    where: { id },
  });
  return result;
};

export const itemcategoryService = {
  createItemCategory,
  getItemCategory,
  updateItemCategory,
  deleteItemCategory,
};
