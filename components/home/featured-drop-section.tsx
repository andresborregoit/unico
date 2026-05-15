'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { BrutalButton, ScrollReveal } from '@/components/shared'

export function FeaturedDropSection() {
  const [imageError, setImageError] = useState(false)

  return (
    <section className="relative h-[90vh] md:h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-secondary">
        {!imageError ? (
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop"
            alt="Drop 02 Campaign"
            fill
            className="object-cover"
            sizes="100vw"
            onError={() => setImageError(true)}
          />
        ) : null}
        {/* Multi-layer cinematic overlay */}
        <div className="absolute inset-0 bg-background/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
        <ScrollReveal>
          <p className="text-[10px] tracking-[0.5em] text-accent mb-8">
            DROP 02
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] text-foreground mb-6 max-w-4xl leading-[0.95]">
            THE UNDERGROUND<br />
            MEETS ARCHITECTURE
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <p className="text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed">
            A collection inspired by the raw beauty of brutalist Buenos Aires.
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={0.3}>
          <BrutalButton size="lg" asChild>
            <Link href="/collections/drop-02">
              SHOP THE DROP
            </Link>
          </BrutalButton>
        </ScrollReveal>
      </div>

      {/* Side text decoration */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 hidden lg:block">
        <p className="text-[10px] tracking-[0.3em] text-muted-foreground -rotate-90 origin-center whitespace-nowrap">
          FALL / WINTER 2026
        </p>
      </div>
    </section>
  )
}
