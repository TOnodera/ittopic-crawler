import { Configuration } from 'crawlee';

export enum SITE {
  QIITA = 1 as number,
  CLASSMETHOD = 2,
  CYBOZUSHIKI = 3,
  SONICGARDEN = 4,
  FREEE = 5,
}

export const SITES: { [key in SITE]: { id: SITE; name: string; urls: string[] } } = {
  [SITE.QIITA]: {
    id: SITE.QIITA,
    name: SITE[SITE.QIITA],
    urls: ['https://qiita.com/'],
  },
  [SITE.CLASSMETHOD]: {
    id: SITE.CLASSMETHOD,
    name: SITE[SITE.CLASSMETHOD],
    urls: ['https://dev.classmethod.jp/'],
  },
  [SITE.CYBOZUSHIKI]: {
    id: SITE.CYBOZUSHIKI,
    name: SITE[SITE.CYBOZUSHIKI],
    urls: ['https://cybozushiki.cybozu.co.jp/'],
  },
  [SITE.SONICGARDEN]: {
    id: SITE.SONICGARDEN,
    name: SITE[SITE.SONICGARDEN],
    urls: ['https://kuranuki.sonicgarden.jp/'],
  },
  [SITE.FREEE]: {
    id: SITE.FREEE,
    name: SITE[SITE.FREEE],
    urls: ['https://developers.freee.co.jp/'],
  },
};

// クローラーコンフィグ (crawlee.json作ってもOK)
export const config = Configuration.getGlobalConfig();
config.set('logLevel', 'INFO');
// 環境変数から取得するトークン
export const PRIVATE_TOKEN: string = process.env.PRIVATE_TOKEN as string;
// axiosのリトライ回数
export const HTTP_RETRY_COUNT = 3;

/**
 * 同じサイトに対しての処理なので並列処理するとアタックとみなされる可能性がある。
 * なので並列処理は行わない
 */
// 同時実行数の最小・最大値
export const MIN_CONCURRENCY = 1;
export const MAX_CONCURRENCY = 1;
// リクエストの間隔１秒あける
export const REQUEST_INTERVAL = 1000;
