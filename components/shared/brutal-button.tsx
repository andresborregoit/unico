'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const brutalButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-xs tracking-[0.15em] uppercase transition-all duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-foreground text-background hover:bg-accent hover:text-accent-foreground',
        outline:
          'border border-foreground text-foreground hover:bg-foreground hover:text-background',
        ghost:
          'text-foreground hover:bg-secondary',
        muted:
          'bg-secondary text-secondary-foreground hover:bg-muted',
        accent:
          'bg-accent text-accent-foreground hover:bg-foreground hover:text-background',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-11 px-8',
        sm: 'h-9 px-4',
        lg: 'h-14 px-12 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BrutalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof brutalButtonVariants> {
  asChild?: boolean
}

const BrutalButton = React.forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(brutalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
BrutalButton.displayName = 'BrutalButton'

export { BrutalButton, brutalButtonVariants }
