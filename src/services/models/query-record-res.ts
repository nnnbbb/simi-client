import { WordRes } from './word-res';
export interface QueryRecordRes {
  /**
   * @description: 总数
   */
  total: number;

  /**
   * @description:
   */
  list: Array<WordRes>;
}
