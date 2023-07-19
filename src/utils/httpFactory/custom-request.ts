import { Http } from '@/utils/Http';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ApiRequestOptions } from './request-options';
import { getFormData, getRequestBody, getUrl } from './utils';

export function customRequest<T = any, R = AxiosResponse<T>, D = any>(
  options: ApiRequestOptions,
): Promise<R> {
  const url = getUrl(options);
  const formData = getFormData(options);
  const body = getRequestBody(options);
  const requestConfig: AxiosRequestConfig = {
    url,
    data: body ?? formData,
    method: options.method,
  };
  return Http.request<T, R, D>(requestConfig);
}
