import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: 单词 -
 */
export const wordUpdate = async function (
  path: PathParameter,
  requestBody: m.UpdateWordBook,
): Promise<any> {
  return customRequest({
    url: '/word/{id}',
    method: 'patch',
    mediaType: 'application/json',
    path: path,
    body: requestBody,
  });
};
