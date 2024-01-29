/*
  Warnings:

  - Added the required column `batchHistoryId` to the `CrawlerStats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CrawlerStats" ADD COLUMN     "batchHistoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "BatchHistory" (
    "id" SERIAL NOT NULL,
    "startAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BatchHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrawlerStats" ADD CONSTRAINT "CrawlerStats_batchHistoryId_fkey" FOREIGN KEY ("batchHistoryId") REFERENCES "BatchHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
