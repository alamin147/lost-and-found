import { LostItem } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../config/prisma";

const toggleFoundStatus = async (id: string) => {
  // First get the current item to check its status
  const currentItem = await prisma.lostItem.findUnique({
    where: { id },
    select: { isFound: true },
  });

  if (!currentItem) {
    throw new Error("Item not found");
  }

  // Toggle the found status
  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      isFound: !currentItem.isFound,
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
    where: {
      isDeleted: false, 
    },
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
      isDeleted: false, // Only get non-deleted items
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
      isDeleted: false,
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
  const result = await prisma.lostItem.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
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
export const lostTItemServices = {
  toggleFoundStatus,
  createLostItem,
  getLostItem,
  getSingleLostItem,
  getMyLostItem,
  editMyLostItem,
  deleteMyLostItem,
};
