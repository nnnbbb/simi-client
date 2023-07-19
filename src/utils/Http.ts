import { message, Modal } from 'antd';
import axios from 'axios';

// 与登录有关的错误码 1: hospital-code 2: 密码输入多次错误账号锁定 3：token异常 4： 账号锁定
const loginErrorCode = [1, 2, 3, 4];

// 标志异常弹窗出现仅一次
let loginErrorFlag = false;
const API_BASE_URL = `http://192.168.29.196:6001`
console.log('API_BASE_URL ->', API_BASE_URL)

interface CreateHttpProps {
  errorHandling?: boolean;
}

const CreateHttp = (HttpProps: CreateHttpProps = {}) => {
  const { errorHandling } = HttpProps;

  // 创建axios实例
  const instance = axios.create({
    timeout: 1000 * 60 * 3,
    baseURL: `${API_BASE_URL}/api`,
  });

  instance.interceptors.request.use(
    (config) => {

      // @ts-ignore
      config.headers['content-type'] = 'application/json';
      return config;
    },
    (err) => {
      console.log(err);
      return Promise.reject(err);
    },
  );

  if (errorHandling) {
    // 错误处理接口
    instance.interceptors.response.use(
      (response) => {
        const { code, msg } = response.data;
        if (code === 0) {
          return response.data;
        }

        if (loginErrorCode.includes(code) && !loginErrorFlag) {
          loginErrorFlag = true;
          Modal.info({
            title: '系统异常',
            content: msg,
            okText: '确定',
            zIndex: 2000,
            onOk: () => {

            },
          });
        } else {
          return response.data;
        }

        return Promise.reject(response.data);
      },
      (error) => {
        // 拦截错误
        console.error('拦截错误', error);

        if (error && error.response) {
          return Promise.reject();
        }
        return Promise.reject();
      },
    );
  } else {
    instance.interceptors.response.use(
      (response) => {
        const { data, code, msg } = response.data;
        if (code === 0) {
          return data;
        }

        if (loginErrorCode.includes(code) && !loginErrorFlag) {
          loginErrorFlag = true;
          Modal.info({
            title: '系统异常',
            content: msg,
            okText: '确定',
            zIndex: 2000,
            onOk: () => {

            },
          });
        } else {
          message.error(msg);
        }

        return Promise.reject(response.data);
      },
      (error) => {
        // 拦截错误
        console.error('拦截错误', error);

        return Promise.reject();
      },
    );
  }

  return instance;
};

export const Http = CreateHttp();
export const ErrorHandlerHttp = CreateHttp({ errorHandling: true });
