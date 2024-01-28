import { SITE } from '@/config.js';
import { PrismaClient } from '@prisma/client';

export interface NewArticle {
  title: string;
  siteId: number;
  contentHash: string;
  url: string;
  contentId: string;
}

export interface Article {
  id: number;
  title: string;
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
    await this.client.article.update({ where: { id: data.id }, data });
  };

  getArticle = async (id: number): Promise<Article | null> => {
    return this.client.article.findUnique({ where: { id } });
  };
  getArticleByContentId = async (siteId: SITE, contentId: string): Promise<Article | null> => {
    return this.client.article.findFirst({ where: { contentId, siteId } });
  };
}
