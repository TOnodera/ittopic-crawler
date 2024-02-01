import { HTTP_RETRY_COUNT } from '@/config.js';
import { http } from '@/utils/axios.js';
import { clone } from '@/utils/clone.js';
import { test, describe, expect } from '@jest/globals';
import axios, { AxiosError, AxiosStatic, InternalAxiosRequestConfig } from 'axios';

jest.mock('axios', () => {
  const original = jest.requireActual('axios');
  return Object.assign(jest.fn(), {
    __esMoudle: true,
    ...original,
    default: {
      create: jest.fn(() => {
        return {
          post: jest.fn(() => {
            throw new AxiosError('Internal Server Error', '500');
          }),
        };
      }),
    },
  });
});
jest.spyOn(axios, 'post');
describe('httpクライアントテスト', () => {
  test('HTTP_RETRY_COUNT回まではリトライする', async () => {
    const mock = () => {
      throw new AxiosError();
    };
    (axios.post as any).mockImplementationOnce(async () => 'test');
    const res = await http.post('test');
    expect(res).toBe('test');
  });
  test('HTTP_RETRY_COUNT回以上エラーが発生したらAxiosErrorを投げる', async () => {
    const mock = () => {
      throw new AxiosError();
    };
    const res = await http.post('test');
    expect(http.post).toThrowError(AxiosError);
  });
});
