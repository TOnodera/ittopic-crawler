import { SITE } from '@/config.js';
import { AxiosInstance, AxiosResponse } from 'axios';
import { BatchHistory, BatchResult, CrawlingResult } from 'shared';

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

export interface NewArticle {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
  ogpTitle: string | undefined;
  ogpImage: string | undefined;
  ogpDescription: string | undefined;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  contentHash: string;
  published: boolean;
  siteId: number;
  batchHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AppStore {
  private client: AxiosInstance;
  private buffer: NewArticle[];
  constructor(client: AxiosInstance) {
    this.client = client;
    this.buffer = [];
  }

  async createBatchHistory(req?: BatchHistory): Promise<number> {
    const { data } = await this.client.post('/batch-start', req);
    return data.id;
  }

  async updateBatchHistory(id: number, req?: BatchHistory): Promise<number> {
    const { data } = await this.client.post('/batch-end', { id, data: req });
    return data.id;
  }

  async regist(data: BatchResult): Promise<boolean> {
    const { isError } = await this.client.post<any, { isError: boolean }>('/regist', { data });
    return isError;
  }

  pushBuff = async (data: NewArticle) => {
    this.buffer.push(data);
  };

  getBuffAll = () => {
    const buf = structuredClone(this.buffer);
    this.buffer = [];
    return buf;
  };

  getArticleByContentId = async (
    siteId: SITE,
    contentId: string
  ): Promise<AxiosResponse<Article | null>> => {
    return await this.client.get(`/article-reader/${siteId}/${contentId}`);
  };
}
