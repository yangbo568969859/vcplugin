import { memo } from 'react';
import UserAvatar from '@/assets/user-avatar.png'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Base/Icons'
import MarkdownContent from './MarkdownContent'
import { ParentProps } from  '@/types/answer'

import './child.css'

type MergeParentProps = ParentProps & {
  editText: (value: string) => void;
}

const ChildQuestion = memo<MergeParentProps>(function ChildQuestion(props: MergeParentProps) {
  const { content, editText: editTextPar } = props;
  const editText = (text: string) => {
    editTextPar(text)
  }
  return (
    <div className='question bg-[#e5e7eb] text-[#000] dark:text-[#e5e7eb] dark:bg-[#1f1f1f]'>
      <div className='title flex justify-between items-center h-8'>
        <div className='user flex items-center'>
          <span className='avatar'>
            <img className='img' src={UserAvatar} alt="" />
          </span>
          <div>yangbo08</div>
        </div>
        <div className='operation flex items-center'>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editText(content)}
          >
            <Icons.edit size={18} className="rotate-0 scale-100 transition-all" />
          </Button>
        </div>
      </div>
      <div className='content mx-0 p-2 px-0'>
        <MarkdownContent content={content} />
      </div>
    </div>
  )
})

export default ChildQuestion;
