import { FoundItem, Prisma, PrismaClient } from "@prisma/client";
import { TFilter } from "../../global/interface";
import { selects } from "../../utils/selects";

const prisma = new PrismaClient();
const createFoundItem = async (data: FoundItem, userId: string) => {
  const result = await prisma.foundItem.create({
    data: {
      categoryId: data.categoryId,
      description: data.description,
      foundItemName: data.foundItemName,
      location: data.location,
      userId,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      category: true,
    },
  });
  return result;
};

const getFoundItem = async (data: TFilter) => {
  const {
    searchTerm,
    page = 1,
    limit = 10,
    sortBy = "foundItemName",
    sortOrder = "asc",
    foundItemName,
  } = data;

  const whereConditions: Prisma.FoundItemWhereInput = {};

  if (foundItemName) {
    whereConditions.foundItemName = {
      contains: foundItemName,
      mode: "insensitive",
    };
  }
  if (searchTerm) {
    whereConditions.OR = [
      { foundItemName: { contains: searchTerm, mode: "insensitive" } },
      { location: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
    ];
  }

  const result = await prisma.foundItem.findMany({
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: (Number(page) - 1) * Number(limit),
    take: Number(limit),

    select: selects.foundItemSelect,
  });

  return result;
};

export const foundItemService = {
  createFoundItem,
  getFoundItem,
};
