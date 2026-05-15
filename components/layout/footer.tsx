import Link from 'next/link'
import { Instagram, Twitter } from 'lucide-react'
import { ScrollReveal } from '@/components/shared'

const footerLinks = {
  shop: [
    { href: '/collections', label: 'Collections' },
    { href: '/new-arrivals', label: 'New Arrivals' },
    { href: '/archive', label: 'Archive' },
    { href: '/sale', label: 'Sale' },
  ],
  info: [
    { href: '/about', label: 'About' },
    { href: '/stores', label: 'Stores' },
    { href: '/contact', label: 'Contact' },
    { href: '/careers', label: 'Careers' },
  ],
  help: [
    { href: '/shipping', label: 'Shipping' },
    { href: '/returns', label: 'Returns' },
    { href: '/sizing', label: 'Size Guide' },
    { href: '/faq', label: 'FAQ' },
  ],
  social: [
    { href: 'https://instagram.com', label: 'Instagram' },
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://tiktok.com', label: 'TikTok' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
            {/* Logo & Description */}
            <ScrollReveal className="col-span-2">
              <Link href="/" className="text-display text-2xl md:text-3xl tracking-[0.15em] text-foreground inline-block">
                UNICO
              </Link>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xs">
                Underground streetwear from Buenos Aires. Brutalist fashion for the modern culture.
              </p>
              <div className="flex items-center gap-4 mt-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Shop */}
            <ScrollReveal delay={0.1}>
              <h3 className="text-[10px] tracking-[0.3em] text-foreground mb-6">SHOP</h3>
              <ul className="space-y-4">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Info */}
            <ScrollReveal delay={0.15}>
              <h3 className="text-[10px] tracking-[0.3em] text-foreground mb-6">INFO</h3>
              <ul className="space-y-4">
                {footerLinks.info.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Help */}
            <ScrollReveal delay={0.2}>
              <h3 className="text-[10px] tracking-[0.3em] text-foreground mb-6">HELP</h3>
              <ul className="space-y-4">
                {footerLinks.help.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Social */}
            <ScrollReveal delay={0.25}>
              <h3 className="text-[10px] tracking-[0.3em] text-foreground mb-6">SOCIAL</h3>
              <ul className="space-y-4">
                {footerLinks.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-muted-foreground tracking-[0.15em]">
            © 2026 UNICO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-[0.15em]"
            >
              PRIVACY
            </Link>
            <Link
              href="/terms"
              className="text-[10px] text-muted-foreground hover:text-foreground transition-colors tracking-[0.15em]"
            >
              TERMS
            </Link>
          </div>
        </div>
      </div>

      {/* Extra padding for mobile bottom nav */}
      <div className="h-20 md:h-0" />
    </footer>
  )
}
