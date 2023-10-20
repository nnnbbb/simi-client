import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: 记录 - 获取需要记忆的单词
 */
export const recordGetMemory = async function (): Promise<m.WordRes> {
  return customRequest({
    url: '/record/memory',
    method: 'get',
  });
};
