import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface QueryParameter {
  /**
   * @description: 页码
   */
  page?: number;

  /**
   * @description: 页面大小
   */
  pageSize?: number;

  /**
   * @description: 排序
   */
  sort?: string;
}
/**
 * @description: 记录 - 单词时间线
 */
export const recordQuery = async function (
  query: QueryParameter,
): Promise<m.QueryRecordRes> {
  return customRequest({
    url: '/record',
    method: 'get',
    query: query,
  });
};
