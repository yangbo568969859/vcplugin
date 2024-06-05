import { baseURL } from './const'

function chatTextStream () {
  const eventSource = new EventSource(`${baseURL}/proxy/gpt/gpt/text_chat_stream/CodeChat.prompt_custom`);

  eventSource.onopen = () => {
    console.log('EventSource连接成功');
  }

  eventSource.onmessage = (event) => {
    console.log('EventSource连接成功');
    try {
      if (event.data && typeof event.data === 'string') {
        const data = JSON.parse(JSON.parse(event.data));

        //业务逻辑回调
        console.log(data);
      }
    } catch (error) {
      console.log('EventSource初始化异常', error);
    }
  }

  eventSource.onerror = (error) => {
    console.log('EventSource连接错误', error);
  }

  eventSource.close = () => {
    console.log('EventSource连接断开');
  }
}

export enum StreamType {
  SUCCSEE,
  ERROR,
  DONE,
  PROGRESS
}
export function getStreamData (data: any, callback: any) {
  fetch('/proxy/gpt/gpt/text_chat_stream/CodeChat.prompt_custom', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => {
    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      function readEvent () {
        reader.read().then(({ done, value }) => {
          if (done) {
            callback({
              type: StreamType.DONE,
              message: ''
            })
            console.log('EventSource connection closed');
            return;
          }

          const resValue = decoder.decode(value);
          callback({
            type: StreamType.PROGRESS,
            message: resValue
          });

          readEvent();
        });
      }
      readEvent();

    } else {
      console.error('EventSource request failed');
      callback({
        type: StreamType.ERROR,
        message: "请求出错"
      })
    }
  }).catch(error => {
    callback({
      type: StreamType.ERROR,
      message: error
    })
  })
}

export default chatTextStream;
