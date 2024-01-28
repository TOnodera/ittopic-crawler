import { ArticleStore, NewArticle } from '@/store/articleStore.js';
import { logger } from '@/utils/logger.js';
import { SITE } from '@/config.js';
import { makeHashFromString } from '@/utils/makeHash.js';

/**
 * このアプリケーションのメインロジックを実装
 * 内容は簡単データの新規登録か更新か判定して登録するだけ、
 * ビジネスロジック的なものはここに書く
 *
 * 簡単なロジックだけど一応バリデーションは入れる
 */
class ArticleDomain {
  private store: ArticleStore;
  private siteId: SITE;
  constructor(store: ArticleStore, siteId: SITE) {
    this.store = store;
    this.siteId = siteId;
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
    if (!oldArticle) {
      await this.store.createArticle({ ...data, contentHash: makeHashFromString(data.content) });
      logger.info(`${SITE[this.siteId]} title: ${data.title} を登録しました`);
    }
    // データは存在するが、ハッシュ値が登録済みデータと一致しない場合はデータが更新されたとみなしてDBも更新する
    // 実装したけどこのパターンは多分あんまないと思う
    else {
      if (oldArticle.contentHash != data.contentHash) {
        await this.store.updateArticle({
          ...oldArticle,
          content: data.content,
          contentHash: makeHashFromString(data.content),
        });
        logger.info(`${SITE[this.siteId]} title: ${data.title} を更新しました`);
      }
    }

    return true;
  }
}

export { ArticleDomain };
