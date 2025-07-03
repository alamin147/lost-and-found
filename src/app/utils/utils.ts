import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config";
import prisma from "../config/prisma";

const passwordHash = async (password: string) => {
  const saltRounds = Number(config.saltrounds);
  const hashedPassword: string = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePasswords = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  const match: boolean = await bcrypt.compare(
    plainTextPassword,
    hashedPassword
  );
  return match;
};

const createToken = (data: Record<string, unknown>): string => {
  return jwt.sign(data, config.jwt_secrets as Secret, {
    algorithm: "HS256",
    expiresIn: config.jwt_expires_in,
  });
};

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, config.jwt_secrets as Secret) as JwtPayload;
};

const calculateMeta = async (data: any) => {
  const { page = 1, limit = 10 } = data;
  const res = (await prisma.foundItem.findMany({})).length;

  const meta = {
    total: res,
    page: Number(page),
    limit: Number(limit),
  };
  return meta;
};

export const utils = {
  passwordHash,
  comparePasswords,
  createToken,
  verifyToken,
  calculateMeta,
};
