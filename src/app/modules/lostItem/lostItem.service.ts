import { LostItem, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const markAsFound = async (id: string) => {
  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      isFound: true,
    },
  });
  return result;
};

const createLostItem = async (userId: string, item: LostItem) => {
  const result = await prisma.lostItem.create({
    data: {
      lostItemName: item.lostItemName,
      description: item.description,
      categoryId: item.categoryId,
      img: item.img,
      location: item.location,
      date: item.date,
      userId,
    }, include: {
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

const getLostItem = async () => {
  const result = await prisma.lostItem.findMany();
  return result;
};

export const lostTItemServices = {
  markAsFound,
  createLostItem,
  getLostItem,
};
