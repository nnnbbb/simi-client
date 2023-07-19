import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: 单词本 -
 */
export const wordFindAll = async function (): Promise<any> {
  return customRequest({
    url: '/word',
    method: 'get',
  });
};
