import { Claim, PrismaClient, status } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
const prisma = new PrismaClient();

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
};
