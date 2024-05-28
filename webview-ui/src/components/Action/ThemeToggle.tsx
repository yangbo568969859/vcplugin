import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Base/Icons'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun size={18} className="rotate-0 scale-100 transition-all" />
      <Icons.moon size={18} className="absolute rotate-90 scale-0 transition-all" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}