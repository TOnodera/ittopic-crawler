import { AxiosInstance } from 'axios';

export class BatchHistoryStore {
  private client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async createBatchHistory(req?: BatchHistory): Promise<number> {
    const { data } = await this.client.post('/batch-start-writer', req);
    return data.id;
  }
  async updateBatchHistory(id: number, req?: BatchHistory): Promise<number> {
    const { data } = await this.client.post('/batch-end-writer', { id, data: req });
    return data.id;
  }
}
