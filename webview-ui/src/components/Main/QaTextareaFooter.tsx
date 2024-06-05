import { FC, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const ModelTypes = [
  {
    name: 'gpt-3.5',
    value: 'gpt-3.5'
  },
  {
    name: 'gpt-3.5-16k',
    value: 'gpt-3.5-16k'
  },
  {
    name: 'gpt-4',
    value: 'gpt-4 限时免费'
  },
  {
    name: 'claude3-opus',
    value: 'claude3-opus 限时免费'
  }
]

const QaTextareaFooter: FC = () => {
  const [value, setValue] = useState("");

  useEffect(() => {

  }, [value])
  
  return (
    <div className='flex gap-2 items-center text-xs'>
      <div>
        <button className='cus-icon-btn'>
          <p className='max-w-16 overflow-hidden text-ellipsis'>普通模式</p>
          <ChevronDown size={14} />
        </button>
      </div>
      <hr className='h-3.5 opacity-60 border-l-2 border-white border-solid' />
      <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className='cus-icon-btn'>
          <p className='max-w-16 overflow-hidden text-ellipsis'>{value}</p>
          <ChevronDown size={14} />
        </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-fit">
          {
            ModelTypes.map((item) => {
              return (
                <DropdownMenuItem className="flex-col items-start">
                  <div className="text-xs text-zinc-500">{ item.value }</div>
                </DropdownMenuItem>
              )
            })
          }
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </div>
  )
}

export default QaTextareaFooter;
