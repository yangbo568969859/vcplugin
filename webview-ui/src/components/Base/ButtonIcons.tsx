import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow
} from "@/components/ui/tooltip"
import React from 'react';

interface ButtonIconsProps {
  tips?: string,
  size?: number,
  showArrow?: boolean,
  children: React.ReactNode,
}

export default function ButtonIcons (props: ButtonIconsProps) {
  const { tips = '', showArrow = false, children } = props;
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          { children }
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tips}</p>
          { showArrow ? <TooltipArrow /> : null }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}