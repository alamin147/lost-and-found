import { PrismaClient } from "@prisma/client";
import { TLogin, newPassword } from "../global/interface";
import { utils } from "../utils/utils";
import AppError from "../global/error";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();
const loginUser = async (data: TLogin) => {
  const { password, username } = data;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username,
        },
        {
          email: username,
        },
      ],
    },
  });

  if (!user) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "User does not exist");
  }

  if (password && !(await utils.comparePasswords(password, user.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password is incorrect");
  }

  const { id, email,role } = user;
  const accessToken = utils.createToken({ id, email,role });
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role,
    token: accessToken,
  };
};

const newPasswords = async (data: newPassword, user: JwtPayload) => {
  const existedUser = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (
    data.currentPassword &&
    existedUser &&
    !(await utils.comparePasswords(data.currentPassword, existedUser.password))
  ) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is incorrect");
  }
  if (data.currentPassword === data.newPassword) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Password is same");
  }

  const newHashPassword = await utils.passwordHash(data.newPassword);
  await prisma.user.update({
    where: {
      email: existedUser?.email,
    },
    data: {
      password: newHashPassword,
    },
  });
};

const changeEmail = async (email: string, user: JwtPayload) => {
  const existedUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existedUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Email already exists. Try new one"
    );
  }

  await prisma.user.update({
    where: {
      username: user.username,
    },
    data: {
      email,
    },
  });
};

const changeUsername = async (username: string, user: JwtPayload) => {
  const existedUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (existedUser) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Username already exists. Try new one"
    );
  }

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      username,
    },
  });
};

export const authServices = {
  loginUser,
  newPasswords,
  changeEmail,
  changeUsername,
};
