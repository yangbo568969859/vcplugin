import { memo } from 'react';
import UserAvatar from '@/assets/user-avatar.png'
import MarkdownContent from './MarkdownContent'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Base/Icons'
import useCopy from '@/hooks/react-client/useCopy';
import { ParentProps } from  '@/types/answer'
import './child.css'

const ChildAnswer = memo<ParentProps>(function ChildAnswer(props: ParentProps) {
  const { content } = props;
  const { copy } = useCopy();

  return (
    <div className='answer'>
      <div className='user flex items-center justify-between h-8 gap-2'>
        <div className='user flex items-center'>
          <span className='avatar'>
            <img className='img' src={UserAvatar} alt="" />
          </span>
          <div>CodeCoplit</div>
        </div>
        <div className='operation flex items-center'>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copy(content)}>
            <Icons.copy size={18} className="rotate-0 scale-100 transition-all" />
          </Button>
          <Button
            variant="ghost"
            size="icon">
            <Icons.delete size={18} className="rotate-0 scale-100 transition-all" />
          </Button>
        </div>
      </div>
      <div className='main mx-0 px-0 mt-2'>
        <MarkdownContent content={content} />
      </div>
    </div>
  )
})

export default ChildAnswer;
