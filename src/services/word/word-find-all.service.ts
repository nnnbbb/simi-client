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
 * @description: 单词 - 列表
 */
export const wordFindAll = async function (
  query: QueryParameter,
): Promise<any> {
  return customRequest({
    url: '/word',
    method: 'get',
    query: query,
  });
};
