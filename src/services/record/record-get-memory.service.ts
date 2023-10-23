import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface QueryParameter {
  /**
   * @description: 单词
   */
  recordTime?: string;
}
/**
 * @description: 记录 - 获取需要记忆的单词
 */
export const recordGetMemory = async function (
  query: QueryParameter,
): Promise<m.WordRes> {
  return customRequest({
    url: '/record/memory',
    method: 'get',
    query: query,
  });
};
