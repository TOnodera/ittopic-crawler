/*
  Warnings:

  - You are about to drop the column `published` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "published",
ALTER COLUMN "title" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "name" DROP NOT NULL;
