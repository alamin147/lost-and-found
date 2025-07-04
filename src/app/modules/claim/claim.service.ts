import { Claim, status } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../config/prisma";

const createClaim = async (item: Claim, user: JwtPayload) => {
  const result = await prisma.claim.create({
    data: {
      foundItemId: item.foundItemId,
      distinguishingFeatures: item.distinguishingFeatures,
      lostDate: item.lostDate,
      userId: user.id,
    },
  });
  return result;
};
const getClaim = async () => {
  const result = await prisma.claim.findMany({
    include: {
      foundItem: {
        include: {
          category: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });
  return result;
};
const getMyClaim = async (user: JwtPayload) => {
  const result = await prisma.claim.findMany({
    where: {
      userId: user.id,
    },
    include: {
      foundItem: {
        include: {
          category: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
  return result;
};

const updateClaimStatus = async (claimId: string, data: Partial<Claim>) => {
  const result = await prisma.claim.update({
    where: {
      id: claimId,
    },
    data,
  });
  return result;
};

export const claimsService = {
  createClaim,
  getClaim,
  updateClaimStatus,
  getMyClaim,
};
