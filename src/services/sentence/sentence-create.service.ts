import * as m from '../models';
import { customRequest } from '@/utils/httpFactory/custom-request';
/**
 * @description: SentenceController_create -
 */
export const sentenceCreate = async function (
  requestBody: m.CreateSentence,
): Promise<any> {
  return customRequest({
    url: '/sentence',
    method: 'post',
    mediaType: 'application/json',
    body: requestBody,
  });
};
