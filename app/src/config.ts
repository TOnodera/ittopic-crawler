export interface Site {
  id: number;
  name: string;
}

export enum SITE {
  QIITA = 1,
  CLASSMETHOD = 2,
}

export const SITES = {
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
};
