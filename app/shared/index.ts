import { SITE } from '@/config';

export interface NewArticle {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  contentHash: string;
  published: boolean;
  siteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CrawlerStats {
  requestsFinished: number | null;
  requestsFailed: number | null;
  retryHistogram: number[];
  requestAvgFailedDurationMillis: number | null;
  requestAvgFinishedDurationMillis: number | null;
  requestsFinishedPerMinute: number | null;
  requestsFailedPerMinute: number | null;
  requestTotalDurationMillis: number | null;
  requestsTotal: number | null;
  crawlerRuntimeMillis: number | null;
  siteId: SITE;
}

export interface CrawlingResult {
  siteId: SITE;
  articles: NewArticle[];
  stats: CrawlerStats;
}

export interface BatchResult {
  crawlingResults: CrawlingResult[];
  batchHistory: BatchHistory;
}

export interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
