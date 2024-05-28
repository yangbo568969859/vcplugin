import { FC } from 'react';
import UserAvatar from '@/assets/user-avatar.png'
import MarkdownContent from './MarkdownContent'
import { ParentProps } from  '@/types/answer'
import './child.css'

const ChildStreaming: FC<ParentProps> = (props: ParentProps) => {
  const { content } = props;
  return (
    <div className="streaming-message answer">
      <div className='user flex items-center justify-between h-8 gap-2'>
        <div className='user flex items-center'>
          <span className='avatar'>
            <img className='img' src={UserAvatar} alt="" />
          </span>
          <div>CodeCoplit</div>
        </div>
        <div className='operation flex items-center'>
        </div>
      </div>
      <div>
        <MarkdownContent content={content} onlyContent={true} />
        <div className='loading'>
          <span>Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default ChildStreaming
