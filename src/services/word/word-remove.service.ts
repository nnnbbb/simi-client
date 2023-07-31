import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: 单词 - 删除
 */
export const wordRemove = async function (path: PathParameter): Promise<any> {
  return customRequest({
    url: '/word/{id}',
    method: 'delete',
    path: path,
  });
};
