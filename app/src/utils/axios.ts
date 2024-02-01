import { HTTP_RETRY_COUNT } from '@/config.js';
import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';

class Http {
  private retryCount: number;
  private request: AxiosInstance;
  constructor(retryCount: number = HTTP_RETRY_COUNT) {
    this.retryCount = retryCount;
    // axiosオブジェクト生成
    this.request = axios.create({
      // baseURL: 'http://api.private-service/api-private/',
      baseURL: 'http://api.private-service:3000/api-private/',
    });
  }

  /**
   *
   * @param path
   * @returns Promise<T | null>
   * @throws AxiosError
   */
  post = async <Req, Res>(path: string, data?: Req): Promise<Res | null> => {
    for (let i = 1; i <= this.retryCount; i++) {
      try {
        return await this.request.post<Req, Res>(path, data);
      } catch (e) {
        // 接続に失敗してもretryCount回は再接続。それでも失敗したら例外をリスロー
        if (e instanceof AxiosError && e.status && HttpStatusCode.InternalServerError <= e.status) {
          if (i <= this.retryCount) {
            continue;
          }
          throw e;
        }
      }
    }
    return null;
  };
}

const http = new Http();
export { http };
