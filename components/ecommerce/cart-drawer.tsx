'use client'

import { useEffect } from 'react'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BrutalButton } from '@/components/shared/brutal-button'
import { cn } from '@/lib/utils'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  size: string
  image: string
  slug: string
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const isEmpty = items.length === 0

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card z-50 flex flex-col border-l border-border animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs tracking-[0.2em] uppercase">
              CART ({items.length})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-foreground hover:text-accent transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isEmpty ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground mb-6">
              Your cart is empty
            </p>
            <BrutalButton onClick={onClose}>
              CONTINUE SHOPPING
            </BrutalButton>
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    'flex gap-4 pb-4 border-b border-border animate-in fade-in slide-in-from-right duration-300',
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.slug}`}
                    className="relative w-20 h-24 bg-secondary flex-shrink-0 overflow-hidden"
                    onClick={onClose}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm text-foreground hover:text-accent transition-colors line-clamp-1"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1 tracking-wider">
                        SIZE: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))
                          }
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors self-start"
                    aria-label="Remove item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  SUBTOTAL
                </span>
                <span className="text-lg">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              <BrutalButton className="w-full" size="lg">
                CHECKOUT
              </BrutalButton>
              <button
                onClick={onClose}
                className="w-full text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
