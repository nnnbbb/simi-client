import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: UserController_remove -
 */
export const userRemove = async function (path: PathParameter): Promise<any> {
  return customRequest({
    url: '/user/{id}',
    method: 'delete',
    path: path,
  });
};
