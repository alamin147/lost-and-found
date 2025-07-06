import { LostItem } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../config/prisma";

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

const getLostItem = async () => {
  const result = await prisma.lostItem.findMany({
    include: {
      user: true,
      category: true,
    },
  });
  return result;
};

// get single lost item
const getSingleLostItem = async (singleId: string) => {
  const result = await prisma.lostItem.findFirst({
    where: {
      id: singleId,
    },
    include: {
      user: true,
      category: true,
    },
  });
  return result;
};
// get my lost item
const getMyLostItem = async (user: JwtPayload) => {
  const result = await prisma.lostItem.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: true,
      category: true,
    },
  });
  return result;
};

const editMyLostItem = async (data: any, user?: JwtPayload) => {
  const updateData: any = {};

  if (data?.lostItemName) {
    updateData.lostItemName = data.lostItemName;
  }
  if (data?.location) {
    updateData.location = data.location;
  }
  if (data?.date) {
    updateData.date = data.date;
  }
  if (data?.description) {
    updateData.description = data.description;
  }
  if (data?.categoryId) {
    updateData.categoryId = data.categoryId;
  }
  if (data?.img) {
    updateData.img = data.img;
  }

  // If user is provided, ensure they can only edit their own items
  const whereClause: any = { id: data.id };
  if (user) {
    whereClause.userId = user.id;
  }

  const result = await prisma.lostItem.update({
    where: whereClause,
    data: updateData,
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
const deleteMyLostItem = async (id: string) => {
  await prisma.lostItem.delete({
    where: {
      id,
    },
  });
  return null;
};
export const lostTItemServices = {
  markAsFound,
  createLostItem,
  getLostItem,
  getSingleLostItem,
  getMyLostItem,
  editMyLostItem,
  deleteMyLostItem,
};
