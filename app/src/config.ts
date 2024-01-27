export interface Site {
  id: number;
  name: string;
}

export enum SITE {
  QIITA = 1,
  CLASSMETHOD = 2,
}

export const SITES = [
  {
    id: SITE.QIITA,
    name: SITE[SITE.QIITA],
  },
  {
    id: SITE.CLASSMETHOD,
    name: SITE[SITE.CLASSMETHOD],
  },
];
