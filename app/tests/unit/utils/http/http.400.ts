import { HTTP_RETRY_COUNT } from '@/config.js';
import { http } from '@/utils/axios.js';
import { clone } from '@/utils/clone.js';
import { test, describe, expect } from '@jest/globals';
import axios, { AxiosError, AxiosStatic, InternalAxiosRequestConfig } from 'axios';

let original: AxiosStatic;
jest.mock('axios', () => {
  original = jest.requireActual('axios');
  return {
    __esMoudle: true,
    ...original,
    post: () => {
      throw new AxiosError('Internal Server Error', '400');
    },
  };
});

describe('httpクライアントテスト', () => {
  test('HTTP_RETRY_COUNT回まではリトライする', async () => {
    const mock = () => {
      throw new AxiosError();
    };
    (axios.post as any)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(() => 'test');
    const res = await http.post('test');
    expect(res).toBe('test');
  });
  test('HTTP_RETRY_COUNT回以上エラーが発生したらAxiosErrorを投げる', async () => {
    const mock = () => {
      throw new AxiosError();
    };
    (axios.post as any)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(mock)
      .mockImplementationOnce(original.post);
    const res = await http.post('test');
    expect(res).toThrowError(AxiosError);
  });
});
