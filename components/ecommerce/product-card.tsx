'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  slug: string
  category?: string
  isNew?: boolean
  isLimited?: boolean
  isSoldOut?: boolean
}

interface ProductCardProps {
  product: Product
  index?: number
  className?: string
}

export function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <article className={cn('group', className)}>
      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-secondary overflow-hidden">
          {product.images[0] && !imageError ? (
            <>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                onError={() => setImageError(true)}
              />
              
              {/* Second image on hover */}
              {product.images[1] && (
                <Image
                  src={product.images[1]}
                  alt={product.name}
                  fill
                  className="object-cover absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              )}
            </>
          ) : (
            /* Fallback placeholder */
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-muted-foreground tracking-widest">NO IMAGE</span>
            </div>
          )}

          {/* Dark overlay on hover */}
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-foreground text-background text-[10px] tracking-[0.15em] uppercase font-medium">
                NEW
              </span>
            )}
            {product.isLimited && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] uppercase font-medium">
                LIMITED
              </span>
            )}
            {discount && !product.isLimited && (
              <span className="px-2 py-1 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] font-medium">
                -{discount}%
              </span>
            )}
          </div>

          {/* Sold Out Overlay */}
          {product.isSoldOut && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <span className="text-xs tracking-[0.2em] uppercase text-foreground font-medium">
                SOLD OUT
              </span>
            </div>
          )}

          {/* Quick Add Button */}
          {!product.isSoldOut && (
            <button
              className="absolute bottom-0 left-0 right-0 py-3 bg-foreground text-background text-xs tracking-[0.15em] uppercase font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-foreground/90"
              onClick={(e) => {
                e.preventDefault()
                // Add to cart logic
              }}
            >
              QUICK ADD
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-1">
          {product.category && (
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              {product.category}
            </p>
          )}
          <h3 className="text-sm text-foreground tracking-wide line-clamp-1 group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
