import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: SentenceController_remove -
 */
export const sentenceRemove = async function (
  path: PathParameter,
): Promise<any> {
  return customRequest({
    url: '/sentence/{id}',
    method: 'delete',
    path: path,
  });
};
