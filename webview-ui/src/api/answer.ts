import { request } from './request';

export function getStreamData(query: any) {
  return request({
    url: '/text_chat_stream/CodeChat.prompt_custom',
    method: 'post',
    params: query
  })
}

export function getMappers () {
  return request({
    url: 'proxy/code_manager/user_config/mappers',
    method: 'get',
    
  })
}