'use client'

import { useState } from 'react'
import { Navbar, MobileBottomNav, Footer } from '@/components/layout'
import { CartDrawer, type CartItem } from '@/components/ecommerce'
import {
  HeroSection,
  EditorialStorySection,
  FeaturedDropSection,
  NewArrivalsSection,
  CollectionsSection,
  NewsletterSection,
} from '@/components/home'

// Sample product data with enhanced info
const featuredProducts = [
  {
    id: '1',
    name: 'OVERSIZED CARGO HOODIE',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&h=1000&fit=crop',
    ],
    slug: 'oversized-cargo-hoodie',
    category: 'Hoodies',
    isNew: true,
  },
  {
    id: '2',
    name: 'DECONSTRUCTED TEE',
    price: 89,
    originalPrice: 120,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
    ],
    slug: 'deconstructed-tee',
    category: 'T-Shirts',
  },
  {
    id: '3',
    name: 'TACTICAL CARGO PANTS',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=1000&fit=crop',
    ],
    slug: 'tactical-cargo-pants',
    category: 'Pants',
    isLimited: true,
  },
  {
    id: '4',
    name: 'BRUTALIST BOMBER',
    price: 320,
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1000&fit=crop',
    ],
    slug: 'brutalist-bomber',
    category: 'Outerwear',
    isNew: true,
  },
]

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      )
    }
  }

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero */}
        <HeroSection />

        {/* New Arrivals */}
        <NewArrivalsSection products={featuredProducts} />

        {/* Editorial Story Block */}
        <EditorialStorySection />

        {/* Featured Drop Campaign */}
        <FeaturedDropSection />

        {/* Collections */}
        <CollectionsSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      <Footer />
      <MobileBottomNav />
      
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  )
}
