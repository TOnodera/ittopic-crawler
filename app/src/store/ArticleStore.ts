import { SITE } from '@/config.js';
import { AxiosInstance, AxiosResponse } from 'axios';

export interface NewArticleRequest {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
  batchHistoryId: number;
}

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
  batchHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class ArticleStore {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  createArticle = async (data: NewArticleRequest) => {
    return await this.client.post('/article-writer', data);
  };

  getArticleByContentId = async (
    siteId: SITE,
    contentId: string
  ): Promise<AxiosResponse<Article | null>> => {
    return await this.client.get(`/article-reader/${siteId}/${contentId}`);
  };
}
