import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: RecordController_query -
 */
export const recordQuery = async function (): Promise<m.QueryRecordRes> {
  return customRequest({
    url: '/record',
    method: 'get',
  });
};
