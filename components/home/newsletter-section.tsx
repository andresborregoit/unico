'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { BrutalButton, BrutalInput, ScrollReveal } from '@/components/shared'
import { cn } from '@/lib/utils'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.4em] text-accent mb-4">
              STAY CONNECTED
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h2 className="text-display text-4xl md:text-5xl lg:text-6xl tracking-[0.03em] mb-6">
              JOIN THE<br className="md:hidden" /> MOVEMENT
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-sm md:text-base text-muted-foreground mb-10 leading-relaxed max-w-md mx-auto">
              Be the first to know about drops, exclusive releases, and underground events.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.3}>
            {isSubmitted ? (
              <div
                className={cn(
                  'text-center transition-opacity duration-500',
                  isSubmitted ? 'opacity-100' : 'opacity-0'
                )}
              >
                <p className="text-sm text-accent tracking-wide">
                  WELCOME TO THE MOVEMENT
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <BrutalInput
                  type="email"
                  placeholder="YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-center sm:text-left"
                  required
                />
                <BrutalButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'JOINING...' : 'SUBSCRIBE'}
                  {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                </BrutalButton>
              </form>
            )}
          </ScrollReveal>
          
          <ScrollReveal delay={0.4}>
            <p className="text-[10px] text-muted-foreground mt-6 tracking-wide">
              BY SUBSCRIBING, YOU AGREE TO OUR PRIVACY POLICY
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
