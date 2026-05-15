'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { BrutalButton } from '@/components/shared'
import { cn } from '@/lib/utils'

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with cinematic overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1920&h=1080&fit=crop"
          alt="UNICO Collection"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <div
          className={cn(
            'motion-safe:transition-all motion-safe:duration-1000 motion-safe:ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          )}
        >
          <p 
            className={cn(
              'text-[10px] md:text-xs tracking-[0.4em] text-muted-foreground mb-6',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-300',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
          >
            BUENOS AIRES · EST. 2024
          </p>
          
          <h1 
            className={cn(
              'text-display text-7xl md:text-9xl lg:text-[12rem] tracking-[0.08em] text-foreground mb-6',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-500',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            UNICO
          </h1>
          
          <p 
            className={cn(
              'text-sm md:text-base text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-700',
              mounted ? 'opacity-100' : 'opacity-0'
            )}
          >
            Underground streetwear for the modern culture. Brutalist fashion that speaks.
          </p>
          
          <div 
            className={cn(
              'flex flex-col sm:flex-row items-center justify-center gap-4',
              'motion-safe:transition-all motion-safe:duration-700 motion-safe:delay-[900ms]',
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <BrutalButton size="lg" asChild>
              <Link href="/collections">
                EXPLORE COLLECTION
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </BrutalButton>
            <BrutalButton variant="outline" size="lg">
              <Play className="mr-2 w-4 h-4" />
              WATCH LOOKBOOK
            </BrutalButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={cn(
          'absolute bottom-8 left-1/2 -translate-x-1/2',
          'motion-safe:transition-opacity motion-safe:duration-500 motion-safe:delay-[1500ms]',
          mounted ? 'opacity-100' : 'opacity-0'
        )}
      >
        <div className="flex flex-col items-center gap-3 motion-safe:animate-bounce">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
        </div>
      </div>
    </section>
  )
}
