import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: 单词本 -
 */
export const wordFindOne = async function (path: PathParameter): Promise<any> {
  return customRequest({
    url: '/word/{id}',
    method: 'get',
    path: path,
  });
};
