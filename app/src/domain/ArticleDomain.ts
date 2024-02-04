import { ArticleStore, NewArticle } from '@/store/ArticleStore.js';
import { logger } from '@/utils/logger.js';
import { SITE } from '@/config.js';
import { makeHashFromString } from '@/utils/makeHash.js';

/**
 * このアプリケーションのメインロジックを実装
 * 内容は簡単でデータの新規登録か更新か判定して登録するだけ、
 * ビジネスロジック的なものはここに書く
 *
 * 簡単なロジックだけど一応バリデーションは入れる
 */
class ArticleDomain {
  private store: ArticleStore;
  private siteId: SITE;
  private batchHistoryId: number;
  constructor(store: ArticleStore, siteId: SITE, batchHistoryId: number) {
    this.store = store;
    this.siteId = siteId;
    this.batchHistoryId = batchHistoryId;
  }

  /**
   * ここでクローラで取得したそれぞれの記事データを保存する
   *
   * @param data
   * @returns
   */
  async save(data: NewArticle): Promise<boolean> {
    /**
     * データ登録部
     */
    // バリデーション
    if (data.title.trim().length == 0) {
      logger.error(
        `siteId: ${data.siteId} contentId: ${data.contentId} タイトルがないので保存しません`
      );
      return false;
    }
    if (data.content.trim().length == 0) {
      logger.error(
        `siteId: ${data.siteId} contentId: ${data.contentId} 本文がないので保存しません`
      );
      return false;
    }
    // データが存在しない場合は新規登録
    const oldArticle = await this.store.getArticleByContentId(this.siteId, data.contentId);
    const contentHash = makeHashFromString(data.content);
    if (!oldArticle.data) {
      await this.store.createArticle({ ...data, contentHash, batchHistoryId: this.batchHistoryId });
      logger.info(`${SITE[this.siteId]} title: ${data.title} を登録しました`);
    }
    return true;
  }
}

export { ArticleDomain };
