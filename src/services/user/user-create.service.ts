import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: UserController_create -
 */
export const userCreate = async function (
  requestBody: m.CreateUser,
): Promise<any> {
  return customRequest({
    url: '/user',
    method: 'post',
    mediaType: 'application/json',
    body: requestBody,
  });
};
