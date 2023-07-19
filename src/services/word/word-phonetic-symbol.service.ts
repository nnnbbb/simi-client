import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: 单词本 - 音标爬取
 */
export const wordPhoneticSymbol = async function (
  requestBody?: any,
): Promise<any> {
  return customRequest({
    url: '/word/phonetic-symbol',
    method: 'post',
    body: requestBody,
  });
};
