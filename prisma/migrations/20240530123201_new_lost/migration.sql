/*
  Warnings:

  - You are about to drop the `LostItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LostItem" DROP CONSTRAINT "LostItem_categoryId_fkey";

-- AlterTable
ALTER TABLE "foundItems" ADD COLUMN     "img" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "LostItem";

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

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "foundItemsCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
