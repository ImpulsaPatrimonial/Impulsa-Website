import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

type TextLinkProps = {
  to: string
  children: React.ReactNode
  underlined?: boolean
  className?: string
  onClick?: () => void
}

export function TextLink({
  to,
  children,
  underlined = false,
  className,
  onClick,
}: TextLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold tracking-[0.03em] text-brand hover:text-navy',
        underlined && 'border-b border-brand pb-1.5 hover:border-navy',
        className,
      )}
    >
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  )
}
