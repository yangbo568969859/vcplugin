import QaTabbar from './QaTabbar';

import GlobalEvent from '@/utils/eventGlobal';
import './index.css'

export default function MainPage () {
  GlobalEvent.on('vs:webviewEvent', (params) => {
    window.parent.postMessage({
      type: params.type,
      content: params.content
    }, '*')
  })

  window.addEventListener('message', (event) => {
    console.log('event:vscode', event)
    if (event.data && event.data.origin === 'vscode') {
      GlobalEvent.emit('vs:sendMessage', event.data)
    }
  })

  return (
    <div className='bg-[#fff] dark:bg-[#181818] overflow-y-hidden min-h-screen mainpage'>
      <QaTabbar />
    </div>
  )
}