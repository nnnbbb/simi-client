export interface CreateWord {
  /**
   * @description: 单词
   */
  word: string;

  /**
   * @description: 中文意思
   */
  chinese?: string;

  /**
   * @description: 例句
   */
  sentence: string;
}
