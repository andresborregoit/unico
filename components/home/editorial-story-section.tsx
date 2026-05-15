'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BrutalButton, ScrollReveal } from '@/components/shared'

export function EditorialStorySection() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="relative min-h-[80vh] md:min-h-screen overflow-hidden">
      <div className="grid md:grid-cols-2 min-h-[80vh] md:min-h-screen">
        {/* Left - Typography Block */}
        <div className="relative flex items-center justify-center p-8 md:p-16 lg:p-24 bg-card order-2 md:order-1">
          <ScrollReveal direction="left" className="max-w-lg">
            <p className="text-[10px] tracking-[0.4em] text-accent mb-6">
              EDITORIAL
            </p>
            <h2 className="text-display text-5xl md:text-6xl lg:text-7xl tracking-[0.02em] text-foreground mb-6 leading-[0.9]">
              THE<br />
              CONCRETE<br />
              JUNGLE
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Exploring brutalist architecture and underground streetwear culture in Buenos Aires. Where raw concrete meets raw fashion.
            </p>
            <BrutalButton variant="outline" asChild>
              <Link href="/editorial/concrete-jungle">
                READ EDITORIAL
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </BrutalButton>
          </ScrollReveal>
        </div>

        {/* Right - Editorial Image */}
        <div className="relative aspect-[3/4] md:aspect-auto order-1 md:order-2 bg-secondary">
          {!imageError ? (
            <Image
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=1600&fit=crop"
              alt="The Concrete Jungle Editorial"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground tracking-widest">EDITORIAL</span>
            </div>
          )}
          {/* Subtle dark overlay for cinematic feel */}
          <div className="absolute inset-0 bg-background/20" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/30 hidden md:block" />
        </div>
      </div>
    </section>
  )
}
