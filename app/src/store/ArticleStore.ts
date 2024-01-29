import { SITE } from '@/config.js';
import { localNow } from '@/utils/time.js';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

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

export class ArticleStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  createArticle = async (data: NewArticle) => {
    await this.client.article.create({ data: { ...data, published: true } });
  };

  updateArticle = async (data: Article) => {
    await this.client.article.update({
      where: { id: data.id },
      data: { ...data, updatedAt: localNow().toJSDate() },
    });
  };

  getArticle = async (id: number): Promise<Article | null> => {
    return this.client.article.findUnique({ where: { id } });
  };
  getArticleByContentId = async (siteId: SITE, contentId: string): Promise<Article | null> => {
    return this.client.article.findFirst({ where: { contentId, siteId } });
  };
}
