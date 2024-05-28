import { FC, useState } from 'react';
import QaContent from './QaContent';

const QaChat: FC = () => {
  const [isAnswer, setIsAnswer] = useState(false);
  const [hasHistory, setHistory] = useState(false);
  
  return (
    <div className='h-[calc(100vh-50px)]'>
      <QaContent isAnswer={isAnswer} setIsAnswer={setIsAnswer} hasHistory={hasHistory} />
    </div>
  )
}

export default QaChat;
