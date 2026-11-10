import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 text-sm font-semibold tracking-btn whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-[14px] [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-navy text-white border border-navy hover:bg-brand hover:border-brand hover:text-white',
        outline:
          'bg-transparent text-navy border border-[rgba(22,50,91,0.35)] hover:border-navy hover:text-navy',
        white: 'bg-white text-navy border border-white hover:bg-[#E8EEF5] hover:text-navy',
        ghostDark:
          'bg-[rgba(255,255,255,0.06)] text-white border border-[rgba(255,255,255,0.55)] hover:bg-[rgba(255,255,255,0.14)] hover:text-white',


        // Alias shadcn / usos internos
        default: 'bg-navy text-white border border-navy hover:bg-brand hover:border-brand hover:text-white',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-brand underline-offset-4 hover:underline min-h-0 px-0',
      },
      size: {
        default: '',
        sm: 'min-h-11 px-5',
        lg: 'min-h-[52px] px-7',
        nav: 'min-h-[46px] px-[22px]',
        navSolid: 'min-h-11 px-[22px]',
        icon: 'min-h-10 w-10 px-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
