/*
  Warnings:

  - Added the required column `contentInt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "contentInt" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
