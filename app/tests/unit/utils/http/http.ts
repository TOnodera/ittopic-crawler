import { http } from '@/utils/axios.js';
import { test, describe, expect } from '@jest/globals';
import { AxiosError } from 'axios';
import { server } from './mock';

describe('httpクライアントテスト', () => {
  beforeAll(() => {
    server.listen();
  });
  test('HTTP_RETRY_COUNT回まではリトライする', async () => {
    // const res = await http.post<any, { id: number }>('/succeeded');
    const res = await fetch(`http://api.private-service:3000/api-private/succeeded`, {
      method: 'post',
    });
    res.json().then((res) => {
      expect(res.id).toBe(1);
    });
  });
  test('HTTP_RETRY_COUNT回以上エラーが発生したらAxiosErrorを投げる', async () => {
    const res = await http.post('test');
    expect(http.post).toThrowError(AxiosError);
  });
  afterAll(() => {
    server.close();
  });
});
