import { request } from './request';

export function getStreamData(data: any) {
  return request({
    url: '/gpt/gpt/text_chat_stream/CodeChat.prompt_custom',
    method: 'post',
    timeout: 0,
    data
  })
}

export function getMappers (params: any) {
  return request({
    url: '/code_manager/user_config/mappers',
    method: 'get',
    params
  })
}