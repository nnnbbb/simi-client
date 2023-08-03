import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: UserController_findAll -
 */
export const userFindAll = async function (): Promise<any> {
  return customRequest({
    url: '/user',
    method: 'get',
  });
};
