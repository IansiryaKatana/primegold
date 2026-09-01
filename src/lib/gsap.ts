import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP as useGSAPHook } from '@gsap/react'
import {
  motionEase,
  revealDefaults,
  scrollDefaults,
  splitTextDefaults,
  staggerDefaults,
} from '@/lib/motion-presets'

let registered = false

export function registerGsapPlugins() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAPHook)
  registered = true
}

export type ScrollRevealVars = gsap.TweenVars & {
  stagger?: number | gsap.StaggerVars
  scrollTrigger?: ScrollTrigger.Vars
}

export function scrollReveal(
  targets: gsap.TweenTarget,
  vars: ScrollRevealVars = {},
) {
  registerGsapPlugins()
  const { scrollTrigger: scrollTriggerVars, stagger, ...tweenVars } = vars

  return gsap.from(targets, {
    y: revealDefaults.y,
    opacity: revealDefaults.opacity,
    duration: revealDefaults.duration,
    ease: revealDefaults.ease,
    ...tweenVars,
    stagger: stagger ?? staggerDefaults.amount,
    scrollTrigger: {
      ...scrollDefaults,
      ...(scrollTriggerVars && typeof scrollTriggerVars === 'object'
        ? scrollTriggerVars
        : {}),
    },
  })
}

export type SplitTextRevealOptions = {
  type?: 'lines' | 'words' | 'chars'
  stagger?: number
  duration?: number
  delay?: number
  y?: number
  scrollTrigger?: ScrollTrigger.Vars | false
  reducedMotion?: boolean
}

export function splitTextReveal(
  element: HTMLElement,
  options: SplitTextRevealOptions = {},
) {
  registerGsapPlugins()

  const {
    type = splitTextDefaults.type,
    stagger = 0.1,
    duration = 0.7,
    delay = 0,
    y = 32,
    scrollTrigger,
    reducedMotion = false,
  } = options

  if (reducedMotion) {
    gsap.set(element, { opacity: 1, y: 0 })
    return { split: null, animation: null, revert: () => {} }
  }

  const split = new SplitText(element, {
    type,
    linesClass: splitTextDefaults.linesClass,
    mask: type === 'lines' ? splitTextDefaults.mask : undefined,
  })

  const targets =
    type === 'lines'
      ? split.lines
      : type === 'words'
        ? split.words
        : split.chars

  const tween = gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: motionEase,
    scrollTrigger:
      scrollTrigger === false
        ? undefined
        : {
            ...scrollDefaults,
            trigger: element,
            ...scrollTrigger,
          },
  })

  return {
    split,
    animation: tween,
    revert: () => {
      tween.kill()
      split.revert()
    },
  }
}

export type ParallaxScrubOptions = {
  yPercent?: number
  start?: string
  end?: string
}

export function parallaxScrub(
  element: HTMLElement,
  options: ParallaxScrubOptions = {},
) {
  registerGsapPlugins()
  const { yPercent = 15, start = 'top bottom', end = 'bottom top' } = options

  return gsap.to(element, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement ?? element,
      start,
      end,
      scrub: true,
    },
  })
}

export function refreshScrollTriggers() {
  if (typeof window === 'undefined') return
  registerGsapPlugins()
  ScrollTrigger.refresh()
}

export { gsap, ScrollTrigger, SplitText, useGSAPHook as useGSAP }
