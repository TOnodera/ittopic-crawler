import { test, describe, expect } from '@jest/globals';
import { createArticle, getArticle } from '../../src/store/articleStore';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
test('記事データの登録ができること', async () => {
  const data = { title: 'test1', content_hash: 'hash', siteId: 1 };
  await createArticle(client, data);
});
test('記事データをIDで取得できること', async () => {
  const article = await getArticle(client, 1);
  expect(article?.id).toBe(1);
  expect(article?.title).toBe('test1');
  expect(article?.content_hash).toBe('hash');
});
