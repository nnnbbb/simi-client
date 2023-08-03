import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface QueryParameter {
  /**
   * @description: 单词
   */
  word: string;
}
/**
 * @description: suggest - 单词提示
 */
export const suggestGet = async function (query: QueryParameter): Promise<any> {
  return customRequest({
    url: '/suggest',
    method: 'get',
    query: query,
  });
};
