import { PrismaClient } from '@prisma/client';
import internal from 'stream';

export interface NewArticle {
  id: number;
  title: string;
  content_hash: string;
}
export interface Article {
  id: number;
  title: string;
  content_hash: string;
  published: boolean;
  siteId: number;
  createdAt: Date;
  updatedAt: Date;
}

export const createArticle = async (client: PrismaClient, data: Article) => {
  await client.article.create({
    data,
  });
};

export const getArticle = async (client: PrismaClient, id: number): Promise<Article | null> => {
  return client.article.findUnique({ where: { id } });
};
