import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Base/Icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow
} from "@/components/ui/tooltip"

interface ButtonIconsProps {
  size?: number,
  tips?: string
}

export default function ButtonIcons (props: ButtonIconsProps) {
  const { size = 18, tips = '' } = props;
  return (
    tips ? 
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="ghost"
            size="icon">
            <Icons.copy size={size} className="rotate-0 scale-100 transition-all" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tips}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    : 
    <Button
      variant="ghost"
      size="icon">
      <Icons.copy size={size} className="rotate-0 scale-100 transition-all" />
    </Button>
  )
}