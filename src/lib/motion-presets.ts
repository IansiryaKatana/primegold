export const motionEase = 'power3.out'

export const scrollDefaults = {
  start: 'top 85%',
  toggleActions: 'play none none reverse',
} as const

export const revealDefaults = {
  y: 28,
  opacity: 0,
  duration: 0.65,
  ease: motionEase,
} as const

export const staggerDefaults = {
  amount: 0.4,
  from: 'start' as const,
}

export const splitTextDefaults = {
  type: 'lines' as const,
  linesClass: 'overflow-hidden',
  mask: 'lines' as const,
}
