'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

// SSR-safe scroll reveal - renders visible initially, then animates on client
export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)

  // Mark as mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const element = ref.current
    if (!element) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay the animation
          setTimeout(() => {
            setIsInView(true)
          }, delay * 1000)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [mounted, delay])

  const getTransformStyle = () => {
    // Server render & pre-mount: visible (no animation)
    if (!mounted) return {}
    
    // After mount but before in view: hidden state
    if (!isInView) {
      return {
        opacity: 0,
        transform:
          direction === 'up'
            ? 'translateY(24px)'
            : direction === 'down'
            ? 'translateY(-24px)'
            : direction === 'left'
            ? 'translateX(24px)'
            : 'translateX(-24px)',
      }
    }
    
    // In view: visible
    return { opacity: 1, transform: 'translate(0)' }
  }

  return (
    <div
      ref={ref}
      className={cn(
        mounted && 'transition-all duration-700 ease-out',
        className
      )}
      style={getTransformStyle()}
    >
      {children}
    </div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

// Stagger container with SSR-safe animations
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1, rootMargin: '-50px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [mounted])

  return (
    <div
      ref={ref}
      className={className}
      data-stagger-mounted={mounted}
      data-stagger-visible={isInView}
      data-stagger-delay={staggerDelay}
    >
      {children}
    </div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const checkParentAndAnimate = () => {
      const parent = element.closest('[data-stagger-visible]')
      const parentMounted = element.closest('[data-stagger-mounted="true"]')
      
      if (parentMounted && parent?.getAttribute('data-stagger-visible') === 'true') {
        const delay = parseFloat(parent.getAttribute('data-stagger-delay') || '0.1')
        setTimeout(() => {
          setIsVisible(true)
        }, index * delay * 1000)
        return true
      }
      return false
    }

    // Check immediately
    if (checkParentAndAnimate()) return

    // Watch for parent changes
    const observer = new MutationObserver(() => {
      if (checkParentAndAnimate()) {
        observer.disconnect()
      }
    })

    const parent = element.closest('[data-stagger-visible]')
    if (parent) {
      observer.observe(parent, { attributes: true })
    }

    return () => observer.disconnect()
  }, [mounted, index])

  const getStyle = () => {
    // Server render & pre-mount: visible (no animation)
    if (!mounted) return {}
    
    // After mount but before visible: hidden state
    if (!isVisible) {
      return { opacity: 0, transform: 'translateY(20px)' }
    }
    
    // Visible: show
    return { opacity: 1, transform: 'translateY(0)' }
  }

  return (
    <div
      ref={ref}
      className={cn(mounted && 'transition-all duration-500 ease-out', className)}
      style={getStyle()}
    >
      {children}
    </div>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
}

// Simple fade in for client-side mount animations
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const timer = setTimeout(() => setVisible(true), delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn(mounted && 'transition-opacity duration-700', className)}
      style={!mounted ? {} : { opacity: visible ? 1 : 0 }}
    >
      {children}
    </div>
  )
}
