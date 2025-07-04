import { FoundItem, Prisma } from "@prisma/client";
import { TFilter } from "../../global/interface";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../config/prisma";
const createFoundItem = async (data: FoundItem, userId: string) => {
  const result = await prisma.foundItem.create({
    data: {
      categoryId: data.categoryId,
      description: data.description,
      date: data.date,
      claimProcess: data.claimProcess,
      img: data.img,
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

    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
      category: true,
    },
  });

  return result;
};
const getSingleFoundItem = async (id: string) => {
  const result = await prisma.foundItem.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
        },
      },
      category: true,
    },
  });
  return result;
};

// get my lost item
const getMyFoundItem = async (user: JwtPayload) => {
  const result = await prisma.foundItem.findMany({
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

const editMyFoundItem = async (data: any) => {
  const updateData: any = {};

  if (data?.location) {
    updateData.location = data?.location;
  }
  if (data?.date) {
    updateData.date = data?.date;
  }
  if (data?.description) {
    updateData.description = data?.description;
  }
  const result = await prisma.foundItem.update({
    where: {
      id: data.id,
    },
    data: updateData,
  });
  return result;
};
const deleteMyFoundItem = async (id: string) => {
  await prisma.foundItem.delete({
    where: {
      id,
    },
  });
  return null;
};

export const foundItemService = {
  createFoundItem,
  getFoundItem,
  getSingleFoundItem,
  getMyFoundItem,
  editMyFoundItem,
  deleteMyFoundItem,
};
