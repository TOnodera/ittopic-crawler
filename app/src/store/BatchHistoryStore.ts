import { AxiosInstance } from 'axios';

export class BatchHistoryStore {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async createBatchHistory(data?: BatchHistory): Promise<number> {
    return await this.client.post('/batch-start-writer', data);
  }
  async updateBatchHistory(id: number, data?: BatchHistory): Promise<number> {
    return await this.client.post('batch-end-writer', { id, data });
  }
}
