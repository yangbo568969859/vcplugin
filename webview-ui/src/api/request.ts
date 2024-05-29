import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  headers: {

  }
})

instance.interceptors.request.use(
  config => {
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response) {
      // 请求已发送,但服务器响应了一个状态码不在2xx范围内
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已发送,但没有收到响应
      console.log(error.request);
    } else {
      // 在设置请求时发生了一些其他错误
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  }
)

export function request(config: any) {
  return instance(config);
}