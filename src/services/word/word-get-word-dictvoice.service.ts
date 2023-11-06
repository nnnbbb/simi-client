import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  word: string;
}
/**
 * @description: 单词 - 获取有道发音
 */
export const wordGetWordDictvoice = async function (
  path: PathParameter,
): Promise<any> {
  return customRequest({
    url: '/word/dictvoice/{word}',
    method: 'get',
    path: path,
  });
};
