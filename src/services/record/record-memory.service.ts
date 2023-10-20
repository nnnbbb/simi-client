import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: 记录 - 增加记忆次数
 */
export const recordMemory = async function (
  requestBody: m.Memory,
): Promise<any> {
  return customRequest({
    url: '/record/memory',
    method: 'post',
    mediaType: 'application/json',
    body: requestBody,
  });
};
