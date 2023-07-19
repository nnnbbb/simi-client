import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
export interface PathParameter {
  /**
   * @description:
   */
  id: string;
}
/**
 * @description: SentenceController_update -
 */
export const sentenceUpdate = async function (
  path: PathParameter,
  requestBody: m.UpdateSentence,
): Promise<any> {
  return customRequest({
    url: '/sentence/{id}',
    method: 'patch',
    mediaType: 'application/json',
    path: path,
    body: requestBody,
  });
};
