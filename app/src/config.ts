import { Configuration } from 'crawlee';

export enum SITE {
  CLASSMETHOD = 10 as number,
  CYBOZUSHIKI = 20,
  SONICGARDEN = 30,
  FREEE = 40,
  SANSAN = 50,
  MERCARI = 60,
}

export const SITES: { [key in SITE]: { id: SITE; name: string; name_ja: string; urls: string[] } } =
  {
    [SITE.CLASSMETHOD]: {
      id: SITE.CLASSMETHOD,
      name: SITE[SITE.CLASSMETHOD],
      name_ja: 'DevelopersIO',
      urls: ['https://dev.classmethod.jp/'],
    },
    [SITE.CYBOZUSHIKI]: {
      id: SITE.CYBOZUSHIKI,
      name: SITE[SITE.CYBOZUSHIKI],
      name_ja: 'サイボウズ式',
      urls: ['https://cybozushiki.cybozu.co.jp/'],
    },
    [SITE.SONICGARDEN]: {
      id: SITE.SONICGARDEN,
      name: SITE[SITE.SONICGARDEN],
      name_ja: 'Social Change!',
      urls: ['https://kuranuki.sonicgarden.jp/'],
    },
    [SITE.FREEE]: {
      id: SITE.FREEE,
      name: SITE[SITE.FREEE],
      name_ja: 'freee Developers Hub',
      urls: ['https://developers.freee.co.jp/'],
    },
    [SITE.SANSAN]: {
      id: SITE.SANSAN,
      name: SITE[SITE.SANSAN],
      name_ja: 'Sansan Tech Blog',
      urls: ['https://buildersbox.corp-sansan.com/'],
    },
    [SITE.MERCARI]: {
      id: SITE.MERCARI,
      name: SITE[SITE.MERCARI],
      name_ja: 'mercori engineering',
      urls: ['https://engineering.mercari.com/blog/'],
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
