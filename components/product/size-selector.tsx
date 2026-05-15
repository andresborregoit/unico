'use client'

import { cn } from '@/lib/utils'

interface SizeSelectorProps {
  sizes: Array<{
    name: string
    available: boolean
  }>
  selectedSize: string | null
  onSelectSize: (size: string) => void
}

export function SizeSelector({ sizes, selectedSize, onSelectSize }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          SIZE
        </span>
        <button className="text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors link-brutal">
          SIZE GUIDE
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.name}
            onClick={() => size.available && onSelectSize(size.name)}
            disabled={!size.available}
            className={cn(
              'min-w-[48px] h-12 px-4 text-xs tracking-[0.15em] uppercase transition-all duration-300 border',
              selectedSize === size.name
                ? 'bg-foreground text-background border-foreground'
                : size.available
                  ? 'bg-transparent text-foreground border-border hover:border-foreground'
                  : 'bg-transparent text-muted-foreground/40 border-border/40 cursor-not-allowed line-through'
            )}
          >
            {size.name}
          </button>
        ))}
      </div>
    </div>
  )
}
