import { clone } from '@/utils/clone.js';
import { test, describe, expect } from '@jest/globals';

interface Test {
  a: string | null | undefined;
  b: number | null | undefined;
  c: string | null | undefined;
  d: (string | null | undefined)[];
}
describe('clone()のテスト', () => {
  test('ディープコピーを生成できる', () => {
    const a: Test = {
      a: 'test',
      b: 11,
      c: null,
      d: [undefined],
    };
    let b = clone(a) as Test;
    expect(a.a).toBe(b.a);
    expect(a.b).toBe(b.b);
    expect(a.c).toBe(b.c);
    expect(a.d[0]).toBe(b.d[0]);
    expect(a.d.length).toBe(b.d.length);

    b.a = 'test2';
    b.b = 1;
    b.c = 'hoge';
    b.d = ['aaa', undefined, null];

    expect(a.a).not.toBe(b.a);
    expect(a.b).not.toBe(b.b);
    expect(a.c).not.toBe(b.c);
    expect(a.d[0]).not.toBe(b.d[0]);
    expect(a.d.length).not.toBe(b.d.length);
  });
});
