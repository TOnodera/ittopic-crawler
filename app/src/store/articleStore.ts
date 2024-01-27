import { PrismaClient } from '@prisma/client';

export interface NewArticle {
  title: string;
  siteId: number;
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

export const createArticle = async (client: PrismaClient, data: NewArticle) => {
  const test =await client.article.create({
    data,
  });
  console.log(test)
};

export const getArticle = async (client: PrismaClient, id: number): Promise<Article | null> => {
  return client.article.findUnique({ where: { id } });
};
