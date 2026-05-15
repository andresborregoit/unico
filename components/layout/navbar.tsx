'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const leftNavLinks = [
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/new-arrivals', label: 'NEW' },
]

const rightNavLinks = [
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/lookbook', label: 'LOOKBOOK' },
]

const mobileNavLinks = [
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/new-arrivals', label: 'NEW' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/lookbook', label: 'LOOKBOOK' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-background/90 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-3 items-center h-16 md:h-20">
            {/* Left Section - Mobile Menu Button / Desktop Nav */}
            <div className="flex items-center justify-start">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-foreground hover:text-accent transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Desktop Left Nav */}
              <div className="hidden md:flex items-center gap-8">
                {leftNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors link-brutal"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="text-display text-2xl md:text-3xl tracking-[0.15em] text-foreground hover:text-accent transition-colors"
              >
                UNICO
              </Link>
            </div>

            {/* Right Section - Desktop Nav + Icons */}
            <div className="flex items-center justify-end gap-4 md:gap-6">
              {/* Desktop Right Nav Links */}
              <div className="hidden md:flex items-center gap-8">
                {rightNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors link-brutal"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              
              {/* Icons */}
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  className="p-2 text-foreground hover:text-accent transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <Link
                  href="/account"
                  className="hidden md:flex p-2 text-foreground hover:text-accent transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
                <button
                  className="p-2 -mr-2 text-foreground hover:text-accent transition-colors relative"
                  aria-label="Cart"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-accent-foreground text-[10px] flex items-center justify-center">
                    0
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-card z-50 md:hidden border-r border-border animate-in slide-in-from-left duration-300">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <span className="text-display text-xl tracking-[0.15em]">UNICO</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground hover:text-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 p-6">
                <ul className="space-y-6">
                  {mobileNavLinks.map((link, index) => (
                    <li
                      key={link.href}
                      className="animate-in slide-in-from-left duration-300"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-display text-3xl tracking-[0.1em] text-foreground hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-6 border-t border-border">
                <div className="flex items-center gap-6">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ACCOUNT
                  </Link>
                  <Link
                    href="/help"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    HELP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
