'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ScrollReveal } from '@/components/shared'

const collections = [
  {
    name: 'FALL 2026',
    description: 'The new season',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop',
    href: '/collections/fall-2026',
  },
  {
    name: 'ARCHIVE',
    description: 'Past collections',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop',
    href: '/collections/archive',
  },
]

export function CollectionsSection() {
  return (
    <section className="py-24 md:py-32 lg:py-40 bg-card">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="text-[10px] tracking-[0.4em] text-accent mb-3">SHOP BY</p>
          <h2 className="text-display text-4xl md:text-5xl lg:text-6xl tracking-[0.03em]">
            COLLECTIONS
          </h2>
        </ScrollReveal>

        {/* Collection Cards */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {collections.map((collection, index) => (
            <CollectionCard key={collection.name} collection={collection} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ 
  collection, 
  delay 
}: { 
  collection: typeof collections[0]
  delay: number 
}) {
  const [imageError, setImageError] = useState(false)

  return (
    <ScrollReveal delay={delay}>
      <Link
        href={collection.href}
        className="group relative block aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-secondary"
      >
        {!imageError ? (
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        ) : null}
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-background/40 group-hover:bg-background/50 transition-colors duration-500" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {collection.description.toUpperCase()}
            </p>
            <h3 className="text-display text-3xl md:text-4xl lg:text-5xl tracking-[0.08em] text-foreground">
              {collection.name}
            </h3>
            <div className="mt-4 w-0 h-px bg-foreground group-hover:w-16 transition-all duration-500 mx-auto" />
          </div>
        </div>
      </Link>
    </ScrollReveal>
  )
}
