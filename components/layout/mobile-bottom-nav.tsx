'use client'

import Link from 'next/link'
import { Home, Search, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Search' },
  { href: '/cart', icon: ShoppingBag, label: 'Cart' },
  { href: '/account', icon: User, label: 'Account' },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] tracking-[0.1em] uppercase">
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
      {/* Safe area padding for modern phones */}
      <div className="h-safe-area-bottom bg-card" />
    </nav>
  )
}
