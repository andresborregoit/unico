'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrutalButton, ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared'
import { ProductCard, type Product } from '@/components/ecommerce'

interface NewArrivalsSectionProps {
  products: Product[]
}

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] text-accent mb-3">NEW ARRIVALS</p>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl tracking-[0.03em]">
              LATEST DROPS
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="hidden md:block">
            <Link
              href="/new-arrivals"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
            >
              VIEW ALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Products Grid */}
        <StaggerContainer 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {products.map((product, index) => (
            <StaggerItem key={product.id} index={index}>
              <ProductCard product={product} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile CTA */}
        <ScrollReveal className="mt-10 text-center md:hidden">
          <BrutalButton variant="outline" asChild>
            <Link href="/new-arrivals">
              VIEW ALL PRODUCTS
            </Link>
          </BrutalButton>
        </ScrollReveal>
      </div>
    </section>
  )
}
