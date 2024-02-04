import { CrawlerStats } from '@/store/AppStore';

export class CrawlerStatsRegister {
  private isNotRegisteable = (n: number | null | undefined): boolean => {
    return !Number.isFinite(n) || Number.isNaN(n) || (n !== 0 && !n);
  };

  translate = (stats: CrawlerStats): CrawlerStats => {
    const data = structuredClone(stats) as CrawlerStats;
    if (this.isNotRegisteable(stats.requestsFinished)) {
      data.requestsFinished = null;
    }
    if (this.isNotRegisteable(stats.requestsFailed)) {
      data.requestsFailed = null;
    }
    if (!Array.isArray(stats.retryHistogram)) {
      data.retryHistogram = [];
    }
    if (this.isNotRegisteable(stats.requestAvgFailedDurationMillis)) {
      data.requestAvgFailedDurationMillis = null;
    }
    if (this.isNotRegisteable(stats.requestAvgFinishedDurationMillis)) {
      data.requestAvgFinishedDurationMillis = null;
    }
    if (this.isNotRegisteable(stats.requestsFinishedPerMinute)) {
      data.requestsFinishedPerMinute = null;
    }
    if (this.isNotRegisteable(stats.requestsFailedPerMinute)) {
      data.requestsFailedPerMinute = null;
    }
    if (this.isNotRegisteable(stats.requestTotalDurationMillis)) {
      data.requestTotalDurationMillis = null;
    }
    if (this.isNotRegisteable(stats.requestsTotal)) {
      data.requestsTotal = null;
    }
    if (this.isNotRegisteable(stats.crawlerRuntimeMillis)) {
      data.crawlerRuntimeMillis = null;
    }
    return data;
  };
}
