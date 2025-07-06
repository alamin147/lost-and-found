import { User } from "@prisma/client";
import { utils } from "../../utils/utils";
import AppError from "../../global/error";
import prisma from "../../config/prisma";

const registerUser = async (user: User) => {
  const existedUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: user.username }, { email: user.email }],
    },
  });

  if (existedUser) {
    throw new AppError(400, "Same Username and email exists");
  }

  const hashedPassword = await utils.passwordHash(user.password);

  const result = await prisma.$transaction(async (transactions) => {
    const createdUser = await transactions.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        userImg: user.userImg,
      },
    });

    const returnData = {
      id: createdUser.id,
      userImg: createdUser.userImg,
      username: createdUser.username,
      email: createdUser.email,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
    return returnData;
  });
  return result;
};

const allUsers = async () => {
  const result = await prisma.user.findMany({
    orderBy: {
      activated: "desc",
    },
  });
  return result;
};

const blockUser = async (id: string) => {
  const users = await prisma.user.findFirst({
    where: {
      AND: [{ id }, { activated: true }],
    },
  });

  // if true user found, then user is active. need to block
  if (users) {
     await prisma.user.update({
      where: {
        id,
      },
      data: {
        activated: false,
      },
    });
    return "block";
  }
  // user not found then user is blocked, need to active
  else {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        activated: true,
      },
    });
    return "active";
  }
};

const changeUserRole = async (id: string, role: string) => {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role: role as any, // Since role is an enum in Prisma
    },
  });

  return {
    id: updatedUser.id,
    username: updatedUser.username,
    email: updatedUser.email,
    role: updatedUser.role,
    activated: updatedUser.activated,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  };
};

export const userService = {
  registerUser,
  allUsers,
  blockUser,
  changeUserRole,
};
