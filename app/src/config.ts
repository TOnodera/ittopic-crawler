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

// axiosのリトライ回数
export const HTTP_RETRY_COUNT = 3;
