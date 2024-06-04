import { PrismaClient, User } from "@prisma/client";
import { utils } from "../../utils/utils";
import AppError from "../../global/error";

const prisma = new PrismaClient();

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
  const result = await prisma.user.findMany();
  return result;
};

export const userService = {
  registerUser,
  allUsers,
};
