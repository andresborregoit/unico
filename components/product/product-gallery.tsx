'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({})
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({})
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }))
  }, [])

  const handleImageError = useCallback((index: number) => {
    setErrorImages(prev => ({ ...prev, [index]: true }))
  }, [])

  return (
    <>
      <div className="flex flex-col gap-2 md:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setFullscreenIndex(index)}
            className="relative aspect-[3/4] bg-secondary overflow-hidden group cursor-zoom-in"
          >
            {!errorImages[index] ? (
              <Image
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                fill
                className={cn(
                  'object-cover transition-all duration-700 ease-out',
                  'group-hover:scale-105',
                  loadedImages[index] ? 'opacity-100' : 'opacity-0'
                )}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-muted-foreground tracking-widest">
                  IMAGE UNAVAILABLE
                </span>
              </div>
            )}
            
            {/* Cinematic overlay on hover */}
            <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-500" />
            
            {/* Zoom indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/70">
                CLICK TO ZOOM
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setFullscreenIndex(null)}
        >
          <button
            onClick={() => setFullscreenIndex(null)}
            className="absolute top-6 right-6 z-10 p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] m-4">
            <Image
              src={images[fullscreenIndex]}
              alt={`${productName} - Fullscreen`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
          
          {/* Navigation dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setFullscreenIndex(i)
                  }}
                  className={cn(
                    'w-2 h-2 transition-all duration-300',
                    i === fullscreenIndex 
                      ? 'bg-foreground' 
                      : 'bg-foreground/30 hover:bg-foreground/60'
                  )}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
