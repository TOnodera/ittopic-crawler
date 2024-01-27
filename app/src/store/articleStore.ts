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

export const createArticle = async (client: PrismaClient, data: NewArticle) => {
  await client.article.create({ data: { ...data, published: true } });
};

export const updateArticle = async (client: PrismaClient, data: Article) => {
  await client.article.update({ where: { id: data.id }, data });
};

export const getArticle = async (client: PrismaClient, id: number): Promise<Article | null> => {
  return client.article.findUnique({ where: { id } });
};

export const getArticleByContentId = async (
  client: PrismaClient,
  siteId: SITE,
  contentId: string
): Promise<Article | null> => {
  return client.article.findFirst({ where: { contentId, siteId } });
};
