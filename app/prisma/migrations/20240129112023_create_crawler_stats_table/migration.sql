-- CreateTable
CREATE TABLE "CrawlerStats" (
    "id" SERIAL NOT NULL,
    "requestsFinished" INTEGER,
    "requestsFailed" INTEGER,
    "retryHistogram" INTEGER[],
    "requestAvgFailedDurationMillis" INTEGER,
    "requestAvgFinishedDurationMillis" INTEGER,
    "requestsFinishedPerMinute" INTEGER,
    "requestsFailedPerMinute" INTEGER,
    "requestTotalDurationMillis" INTEGER,
    "requestsTotal" INTEGER,
    "crawlerRuntimeMillis" INTEGER,
    "siteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CrawlerStats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CrawlerStats" ADD CONSTRAINT "CrawlerStats_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
