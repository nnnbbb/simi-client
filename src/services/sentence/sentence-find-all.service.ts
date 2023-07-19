import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: SentenceController_findAll -
 */
export const sentenceFindAll = async function (): Promise<any> {
  return customRequest({
    url: '/sentence',
    method: 'get',
  });
};
