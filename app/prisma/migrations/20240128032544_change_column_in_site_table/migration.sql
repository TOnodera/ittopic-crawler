/*
  Warnings:

  - Made the column `name` on table `Site` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Site" ALTER COLUMN "name" SET NOT NULL;
