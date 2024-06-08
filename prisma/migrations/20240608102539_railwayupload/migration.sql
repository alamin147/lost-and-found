-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "userRole" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "activated" BOOLEAN NOT NULL DEFAULT true,
    "password" TEXT NOT NULL,
    "role" "userRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userImg" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundItemsCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foundItemsCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foundItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '',
    "categoryId" TEXT NOT NULL,
    "foundItemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "claimProcess" TEXT NOT NULL DEFAULT '',
    "isClaimed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "foundItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lostItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lostItemName" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "img" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isFound" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "lostItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "claims" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foundItemId" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'PENDING',
    "distinguishingFeatures" TEXT,
    "lostDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "foundItems" ADD CONSTRAINT "foundItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foundItems" ADD CONSTRAINT "foundItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "foundItemsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "foundItemsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "claims" ADD CONSTRAINT "claims_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES "foundItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
