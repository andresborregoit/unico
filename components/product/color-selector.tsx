'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ColorSelectorProps {
  colors: Array<{
    name: string
    value: string
    available: boolean
  }>
  selectedColor: string | null
  onSelectColor: (color: string) => void
}

export function ColorSelector({ colors, selectedColor, onSelectColor }: ColorSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          COLOR
        </span>
        {selectedColor && (
          <span className="text-[10px] tracking-[0.15em] uppercase text-foreground">
            {colors.find(c => c.name === selectedColor)?.name}
          </span>
        )}
      </div>
      
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => color.available && onSelectColor(color.name)}
            disabled={!color.available}
            className={cn(
              'relative w-8 h-8 rounded-full transition-all duration-300',
              'border-2',
              selectedColor === color.name
                ? 'border-foreground scale-110'
                : color.available
                  ? 'border-transparent hover:border-foreground/50'
                  : 'opacity-40 cursor-not-allowed'
            )}
            style={{ backgroundColor: color.value }}
            aria-label={`Select ${color.name}`}
            title={color.name}
          >
            {selectedColor === color.name && (
              <Check 
                className={cn(
                  'absolute inset-0 m-auto w-4 h-4',
                  color.value === '#000000' || color.value === '#1A1A1A' 
                    ? 'text-white' 
                    : 'text-background'
                )} 
              />
            )}
            {!color.available && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-full h-[1px] bg-foreground/60 rotate-45 absolute" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
