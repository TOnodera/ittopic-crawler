import { ApplicationError } from '@/errors/ApplicationError';

export class BatchTimer {
  private startAt: Date | undefined;
  private endAt: Date | undefined;

  start() {
    this.startAt = new Date();
  }

  end() {
    this.endAt = new Date();
  }

  getResult() {
    if (!this.startAt || !this.endAt) {
      throw new ApplicationError("getResult()はstart(),end()を実行した後に呼び出してください");
    }
    return { startAt: this.startAt, endAt: this.endAt };
  }
}
