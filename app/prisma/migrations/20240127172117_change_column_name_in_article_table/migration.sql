/*
  Warnings:

  - You are about to drop the column `contentInt` on the `Article` table. All the data in the column will be lost.
  - Added the required column `contentId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "contentInt",
ADD COLUMN     "contentId" TEXT NOT NULL;
