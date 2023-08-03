import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: UserController_findOne -
 */
export const userFindOne = async function (path: PathParameter): Promise<any> {
  return customRequest({
    url: '/user/{id}',
    method: 'get',
    path: path,
  });
};
