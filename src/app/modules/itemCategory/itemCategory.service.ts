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

export const itemcategoryService = {
  createItemCategory,
  getItemCategory,
};
