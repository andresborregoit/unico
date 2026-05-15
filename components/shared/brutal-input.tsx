'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BrutalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const BrutalInput = React.forwardRef<HTMLInputElement, BrutalInputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-12 w-full bg-input border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors',
            'focus:outline-none focus:border-foreground focus:ring-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive tracking-wider">{error}</p>
        )}
      </div>
    )
  }
)
BrutalInput.displayName = 'BrutalInput'

export interface BrutalTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const BrutalTextarea = React.forwardRef<HTMLTextAreaElement, BrutalTextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId
    
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs tracking-[0.15em] uppercase text-muted-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          className={cn(
            'flex min-h-[120px] w-full bg-input border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none',
            'focus:outline-none focus:border-foreground focus:ring-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-xs text-destructive tracking-wider">{error}</p>
        )}
      </div>
    )
  }
)
BrutalTextarea.displayName = 'BrutalTextarea'

export { BrutalInput, BrutalTextarea }
