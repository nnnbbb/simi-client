import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: UserController_update -
 */
export const userUpdate = async function (path: PathParameter, requestBody: m.UpdateUser): Promise<any> {
  return customRequest({
    url: '/user/{id}',
    method: 'patch',
    mediaType: 'application/json',
    path: path,
    body: requestBody,
  });
};
