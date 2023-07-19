import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: 单词本 -
 */
export const wordCreate = async function (
  requestBody: m.CreateWordBook,
): Promise<any> {
  return customRequest({
    url: '/word',
    method: 'post',
    mediaType: 'application/json',
    body: requestBody,
  });
};
